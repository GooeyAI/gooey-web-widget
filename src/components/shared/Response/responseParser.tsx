import parse, { HTMLReactParserOptions } from "html-react-parser";
import React from "react";
import { marked } from "marked";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import { latexProcessor, LaTeXExpression } from "./latexProcessor";
import { domHandlers, DomNode, Reference, ProcessingData } from "./domHandlers";

// Types
interface ResponseData {
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
  extensions: null,
  gfm: true,
  hooks: null,
  pedantic: false,
  silent: false,
  tokenizer: null,
  walkTokens: null,
  smartLists: true,
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
  return parse(rawHtml as string, parserOptions);
};

const extractOutputText = (data: ResponseData): string => {
  const {
    type = "",
    status = "",
    text,
    detail,
    output_text = [],
    raw_output_text = [],
  } = data;

  let output = "";

  if (type === STREAM_MESSAGE_TYPES.MESSAGE_PART) {
    output = text || detail || "";
  } else if (
    type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE &&
    status === "completed"
  ) {
    output = output_text[0] || raw_output_text[0] || "";
  }

  return replaceAudioEmojis(output);
};

const replaceAudioEmojis = (text: string): string => {
  let result = text;
  Object.entries(AUDIO_EMOJI_REPLACEMENTS).forEach(([from, to]) => {
    result = result.replace(from, to);
  });
  return result;
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

  // 2. Handle LaTeX expressions
  const latexResult = domHandlers.handleLatexExpression(domNode, data);
  if (latexResult) return latexResult;

  // 3. Handle source references
  const sourceResult = domHandlers.handleSourceReferences(domNode, data);
  if (sourceResult) return sourceResult;

  // 4. Handle images
  const imageResult = domHandlers.handleImage(domNode);
  if (imageResult) return imageResult;

  // 5. Handle videos
  const videoResult = domHandlers.handleVideo(domNode);
  if (videoResult) return videoResult;

  // 6. Handle links
  const linkResult = domHandlers.handleLink(domNode, data, createParserOptions);
  if (linkResult) return linkResult;

  // Return undefined if no handler applies
  return undefined;
};
