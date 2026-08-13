import React from "react";
import { domToReact } from "html-react-parser";
import CodeBlock from "src/components/shared/CodeBlock";
import LaTeX from "src/components/shared/LaTeX";
import Link from "src/components/shared/Link";
import CollapsibleButton from "src/components/shared/Buttons/CollapisbleButton";
import Sources from "../../../widgets/copilot/components/Messages/Sources";
import { extractLastPathSegment } from "../../../widgets/copilot/components/Messages/helpers";
import { LaTeXExpression, latexProcessor } from "./latexProcessor";
import MediaPreview, { getMediaTypeFromUrl } from "./MediaPreview";
import SvgPreview from "./SvgPreview";
import { previewableSvgFromCode } from "./svgMarkup";

// Types
export interface DomNode {
  attribs?: Record<string, any>;
  children?: any[];
  name?: string;
  type?: string;
  data?: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface ProcessingData {
  type?: string;
  status?: string;
  text?: string;
  detail?: string;
  output_text?: string[];
  raw_output_text?: string[];
  references?: Reference[];
  showSources?: boolean;
  linkColor?: string;
  latexExpressions?: Map<string, LaTeXExpression>;
}

// Constants
const NUMBER_REFERENCE_REGEX = /\[\d+(,\s*\d+)*\]/g;

export class DomNodeHandlers {
  public handleCodeBlock(
    domNode: DomNode,
    createParserOptions: Function,
  ): React.ReactElement | undefined {
    if (domNode.name !== "pre" || !domNode.children?.length) return;

    const codeChild = domNode.children.find((child) => child?.name === "code");
    if (!codeChild) return;

    const body = this.getNodeText(codeChild);
    const language = this.getCodeLanguage(codeChild);
    const svgMarkup = previewableSvgFromCode(language, body);
    if (svgMarkup) {
      return <SvgPreview markup={svgMarkup} />;
    }

    if (codeChild.attribs?.class?.includes("language-")) {
      return <CodeBlock domNode={codeChild} options={createParserOptions()} />;
    }
  }

  public handleInlineSvg(domNode: DomNode): React.ReactElement | undefined {
    if (domNode.name?.toLowerCase() !== "svg") return;

    const svgMarkup = previewableSvgFromCode(
      "svg",
      this.serializeDomNode(domNode),
    );
    if (!svgMarkup) return;
    return <SvgPreview markup={svgMarkup} />;
  }

  public handleLatexExpression(
    domNode: DomNode,
    data: ProcessingData,
  ): React.ReactElement | undefined {
    if (domNode.type !== "text" || !domNode.data || !data.latexExpressions) {
      return;
    }

    if (!latexProcessor.isLatexPlaceholder(domNode.data)) {
      return;
    }

    const result = latexProcessor.extractPlaceholderFromText(
      domNode.data,
      data.latexExpressions,
    );
    if (!result) return;

    const { placeholder, expression } = result;
    const parts = domNode.data.split(placeholder);
    if (parts.length === 2) {
      const before = parts[0]
        ? (this.handleLatexExpression({ ...domNode, data: parts[0] }, data) ??
          parts[0])
        : null;
      const after = parts[1]
        ? (this.handleLatexExpression({ ...domNode, data: parts[1] }, data) ??
          parts[1])
        : null;

      return (
        <React.Fragment>
          {before}
          <LaTeX displayMode={expression.displayMode}>
            {expression.content}
          </LaTeX>
          {after}
        </React.Fragment>
      );
    }
    return;
  }

  public handleSourceReferences(
    domNode: DomNode,
    data: ProcessingData,
  ): React.ReactElement | undefined {
    if (domNode.type !== "text" || !domNode.data || !data.showSources) {
      return;
    }

    const referenceNumbers = this.extractReferenceNumbers(domNode.data);
    if (referenceNumbers.length === 0) return;

    const sources = this.extractSourcesForReferences(
      referenceNumbers,
      data.references || [],
    );
    const cleanText = this.cleanTextFromReferences(domNode.data);

    return (
      <React.Fragment>
        {cleanText}{" "}
        {!!data.references?.length && (
          <CollapsibleButton>
            <Sources sources={sources} isInline />
          </CollapsibleButton>
        )}
      </React.Fragment>
    );
  }

  public handleImage(domNode: DomNode): React.ReactElement | undefined {
    if (domNode.name !== "img" || !domNode.attribs?.src) return;

    const { src, alt } = domNode.attribs;
    return <MediaPreview src={src} alt={alt} />;
  }

  public handleVideo(domNode: DomNode): React.ReactElement | undefined {
    if (domNode.name !== "video" || !domNode.attribs?.src) return;

    const { src, alt, poster } = domNode.attribs;
    return (
      <MediaPreview src={src} alt={alt} poster={poster} mediaType="video" />
    );
  }

  public handleLink(
    domNode: DomNode,
    data: ProcessingData,
    createParserOptions: Function,
  ): React.ReactElement | undefined {
    if (domNode.name !== "a" || !domNode.attribs?.href) return;

    const href = domNode.attribs.href;

    // Check if the link is a media URL - render as MediaPreview instead
    const mediaType = getMediaTypeFromUrl(href);
    if (mediaType) {
      const linkText =
        domNode.children?.[0]?.data || extractLastPathSegment(href);
      return <MediaPreview src={href} alt={linkText} mediaType={mediaType} />;
    }

    const source =
      this.findSourceByUrl(href, data) ||
      this.createSourceFromNode(domNode, href);

    return (
      <Link data={source} configColor={data.linkColor || "default"}>
        {domToReact(domNode.children || [], createParserOptions())}
      </Link>
    );
  }

  // Helper methods
  private getCodeLanguage(codeNode: DomNode): string {
    const className = codeNode.attribs?.class || "";
    const match = className.match(/language-([\w+]+)/i);
    return match?.[1]?.toLowerCase() || "";
  }

  private getNodeText(node: DomNode): string {
    if (typeof node.data === "string") return node.data;
    return (node.children || [])
      .map((child) => this.getNodeText(child))
      .join("");
  }

  private serializeDomNode(node: DomNode): string {
    if (node.type === "text" || (!node.name && typeof node.data === "string")) {
      return node.data || "";
    }
    if (!node.name) return "";

    const attrs = Object.entries(node.attribs || {})
      .map(([key, value]) => `${key}="${this.escapeAttribute(String(value))}"`)
      .join(" ");
    const open = attrs ? `<${node.name} ${attrs}>` : `<${node.name}>`;
    const inner = (node.children || [])
      .map((child) => this.serializeDomNode(child))
      .join("");
    return `${open}${inner}</${node.name}>`;
  }

  private escapeAttribute(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  private extractReferenceNumbers(text: string): number[] {
    const matches = text.match(NUMBER_REFERENCE_REGEX) || [];
    const numbers = matches
      .flatMap((match) =>
        match
          .slice(1, -1)
          .split(",")
          .map((s) => parseInt(s.trim(), 10)),
      )
      .filter((n) => !isNaN(n));
    return [...new Set(numbers)]; // Remove duplicates
  }

  private extractSourcesForReferences(
    referenceNumbers: number[],
    references: Reference[],
  ): Reference[] {
    return referenceNumbers
      .filter((n) => n >= 1 && n <= references.length)
      .map((n) => references[n - 1]);
  }

  private cleanTextFromReferences(text: string): string {
    let cleanText = text.replaceAll(NUMBER_REFERENCE_REGEX, "");

    // Fix trailing space before period
    if (cleanText.endsWith(" .")) {
      cleanText = cleanText.slice(0, -2) + ".";
    }

    return cleanText;
  }

  private findSourceByUrl(url: string, data: ProcessingData): Reference | null {
    const references = data.references || [];
    return references.find((ref) => ref.url === url) || null;
  }

  private createSourceFromNode(domNode: DomNode, href: string): Reference {
    return {
      title: domNode.children?.[0]?.data || extractLastPathSegment(href),
      url: href,
    };
  }
}

export const domHandlers = new DomNodeHandlers();
