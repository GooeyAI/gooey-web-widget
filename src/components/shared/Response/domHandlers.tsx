import React, { useEffect, useState } from "react";
import { domToReact } from "html-react-parser";
import CodeBlock from "src/components/shared/CodeBlock";
import LaTeX from "src/components/shared/LaTeX";
import Link from "src/components/shared/Link";
import CollapsibleButton from "src/components/shared/Buttons/CollapisbleButton";
import Sources from "../../../widgets/copilot/components/Messages/Sources";
import { extractLastPathSegment } from "../../../widgets/copilot/components/Messages/helpers";
import { LaTeXExpression, latexProcessor } from "./latexProcessor";
import GooeyDialog from "src/components/shared/Dialog";
import IconClose from "src/assets/SvgIcons/IconClose";
import Button from "../Buttons/Button";
import IconButton from "../Buttons/IconButton";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconDownload from "src/assets/SvgIcons/IconDownload";

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

const ImagePreview = ({ src, alt }: { src: string; alt?: string }) => {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(src);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleDownload = async () => {
    // Use fetch + blob to avoid browsers opening a new tab for cross-origin assets
    try {
      const response = await fetch(src, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const filename = alt || src.split("/").pop()?.split("?")[0] || "image";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (_err) {
      // Fallback to opening in a new tab if download is blocked
      window.open(src, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    return () => {
      setIsCopied(false);
    };
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          lineHeight: 0,
        }}
        aria-label={alt ? `Open image: ${alt}` : "Open image"}
      >
        <img
          src={src}
          alt={alt}
          style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
      </button>

      <GooeyDialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xl"
        fullWidth
        variant="bare"
        leftActions={
          <IconButton
            variant="filled"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            aria-label="Close dialog"
          >
            <IconClose size={18} />
          </IconButton>
        }
        rightActions={
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              aria-label="Copy image link"
              variant="filled"
            >
              <div className="d-flex align-center gap-8">
                <span>Download</span>
                <IconDownload size={18} />
              </div>
            </Button>
            <Button
              type="button"
              className="gooey-dialog-bare-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLink();
              }}
              aria-label="Download image"
              variant="filled"
            >
              <div className="d-flex align-center gap-8">
                <span>{isCopied ? "Copied!" : "Copy link"}</span>
                <IconCopy size={18} />
              </div>
            </Button>
          </>
        }
        bodyClassName="d-flex align-center justify-center"
      >
        <img
          src={src}
          alt={alt}
          style={{ maxWidth: "100%", height: "auto" }}
          loading="lazy"
        />
      </GooeyDialog>
    </>
  );
};

export class DomNodeHandlers {
  public handleCodeBlock(
    domNode: DomNode,
    createParserOptions: Function,
  ): React.ReactElement | undefined {
    if (!domNode.attribs || !domNode.children?.length) return;

    const codeChild = domNode.children[0];
    const isCodeBlock =
      codeChild?.name === "code" &&
      codeChild?.attribs?.class?.includes("language-");

    if (isCodeBlock) {
      return <CodeBlock domNode={codeChild} options={createParserOptions()} />;
    }
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
      return (
        <React.Fragment>
          {parts[0]}
          {this.handleLatexExpression({ ...domNode, data: parts[0] }, data)}
          <LaTeX displayMode={expression.displayMode}>
            {expression.content}
          </LaTeX>
          {this.handleLatexExpression({ ...domNode, data: parts[1] }, data)}
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
        {data.references?.length && (
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
    return <ImagePreview src={src} alt={alt} />;
  }

  public handleLink(
    domNode: DomNode,
    data: ProcessingData,
    createParserOptions: Function,
  ): React.ReactElement | undefined {
    if (domNode.name !== "a" || !domNode.attribs?.href) return;

    const href = domNode.attribs.href;
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
  private extractReferenceNumbers(text: string): number[] {
    const matches = text.match(NUMBER_REFERENCE_REGEX) || [];
    const numbers = matches.map((match) => parseInt(match.slice(1, -1), 10));
    return [...new Set(numbers)]; // Remove duplicates
  }

  private extractSourcesForReferences(
    referenceNumbers: number[],
    references: Reference[],
  ): Reference[] {
    if (referenceNumbers.length === 0) return [];

    const startIndex = referenceNumbers[0] - 1;
    const endIndex = referenceNumbers[referenceNumbers.length - 1];
    const count = endIndex - referenceNumbers[0] + 1;

    return references.slice(startIndex, startIndex + count);
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
