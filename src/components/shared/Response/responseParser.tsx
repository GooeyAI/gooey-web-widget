import parse, { HTMLReactParserOptions } from "html-react-parser";
import React from "react";
import { marked } from "marked";
import { latexProcessor, LaTeXExpression } from "./latexProcessor";
import { domHandlers, DomNode, Reference, ProcessingData } from "./domHandlers";

// Types
export interface ResponseData {
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
const AUDIO_EMOJI_REPLACEMENTS = {
  "🎧 I heard:": "",
  "🎧:": "",
};

// Marked configuration
const MARKED_OPTIONS = {
  async: false,
  breaks: true,
  gfm: true,
  pedantic: false,
  silent: false,
} as const;

export const parseResponseBody = (
  data: ResponseData,
  linkColor: string,
  showSources: boolean,
): React.ReactNode => {
  const body = extractOutputText(data);
  if (!body) return "";

  const { processedText, expressions } = latexProcessor.processText(body);
  const rawHtml = marked.parse(processedText, MARKED_OPTIONS);

  const processingData: ProcessingData = {
    ...data,
    showSources,
    linkColor,
    latexExpressions: expressions,
  };

  const parserOptions = createReactParserOptions(processingData);
  return keyTopLevelNodes(parse(rawHtml as string, parserOptions));
};

/**
 * Prefer the markdown already shown while streaming (`text`) so completing a
 * response does not swap in `output_text` and remount the whole parsed tree.
 * Historical messages still fall back to the saved output fields.
 */
export const extractOutputText = (data: ResponseData): string => {
  const { text, detail, output_text = [], raw_output_text = [] } = data;

  const output = text || output_text[0] || raw_output_text[0] || detail || "";
  return replaceAudioEmojis(output);
};

const replaceAudioEmojis = (text: string): string => {
  let result = text;
  Object.entries(AUDIO_EMOJI_REPLACEMENTS).forEach(([from, to]) => {
    result = result.replace(from, to);
  });
  return result;
};

const keyTopLevelNodes = (nodes: ReturnType<typeof parse>): React.ReactNode => {
  const list = Array.isArray(nodes) ? nodes : [nodes];
  return list.map((node, index) => {
    if (!React.isValidElement(node)) {
      return node;
    }
    return React.cloneElement(node, { key: node.key ?? String(index) });
  });
};

const createReactParserOptions = (
  data: ProcessingData,
): HTMLReactParserOptions => ({
  htmlparser2: {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
  },
  replace: (domNode: DomNode) => replaceDomNode(domNode, data),
});

const replaceDomNode = (
  domNode: DomNode,
  data: ProcessingData,
): React.ReactElement | undefined => {
  // Create a bound parser options function for recursive calls
  const createParserOptions = () => createReactParserOptions(data);

  // Try each handler in order of priority

  // 1. Handle code blocks
  const codeResult = domHandlers.handleCodeBlock(domNode, createParserOptions);
  if (codeResult) return codeResult;

  // 2. Handle inline SVG (raw HTML, not a fenced code block)
  const svgResult = domHandlers.handleInlineSvg(domNode);
  if (svgResult) return svgResult;

  // 3. Handle LaTeX expressions
  const latexResult = domHandlers.handleLatexExpression(domNode, data);
  if (latexResult) return latexResult;

  // 4. Handle source references
  const sourceResult = domHandlers.handleSourceReferences(domNode, data);
  if (sourceResult) return sourceResult;

  // 5. Handle images
  const imageResult = domHandlers.handleImage(domNode);
  if (imageResult) return imageResult;

  // 6. Handle videos
  const videoResult = domHandlers.handleVideo(domNode);
  if (videoResult) return videoResult;

  // 7. Handle links
  const linkResult = domHandlers.handleLink(domNode, data, createParserOptions);
  if (linkResult) return linkResult;

  // Return undefined if no handler applies
  return undefined;
};
