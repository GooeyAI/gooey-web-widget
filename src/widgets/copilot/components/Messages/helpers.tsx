import axios from "axios";
import { marked } from "marked";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import CodeBlock from "src/components/shared/CodeBlock";
import IconThumbsUp from "src/assets/SvgIcons/IconThumbsUp";
import IconThumbsUpFilled from "src/assets/SvgIcons/IconThumbsUpFilled";
import IconThumbsDownFilled from "src/assets/SvgIcons/IconThumbsDownFilled";
import IconThumbsDown from "src/assets/SvgIcons/IconThumbsDown";
import Link from "src/components/shared/Link";
import IconSheets from "src/assets/SvgIcons/IconSheets";
import IconGoogleDocs from "src/assets/SvgIcons/IconGoogleDocs";
import IconGoogleSlides from "src/assets/SvgIcons/IconGoogleSlides";
import IconPDF from "src/assets/SvgIcons/IconPDF";
import IconYoutube from "src/assets/SvgIcons/IconYoutube";
import IconGlobeNet from "src/assets/SvgIcons/IconGlobeNet";
import CollapsibleButton from "src/components/shared/Buttons/CollapisbleButton";
import React from "react";
import Sources from "./Sources";

const GOOEY_META_SCRAPPER_API = "https://metascraper.gooey.ai";
const NUMBER_REFERENCE_REGEX = /\[\d+(,\s*\d+)*\]/g;

export const findSourceIcon = (
  contentType: string,
  url: string,
  size: number = 12,
): JSX.ElementType | null => {
  const urlLower = url.toLowerCase();
  // try to guess from url first
  if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
    return () => <IconYoutube size={size} />;
  }
  if (urlLower.endsWith(".pdf")) {
    return () => <IconPDF style={{ fill: "#F40F02" }} size={size || 12} />;
  } else if (
    urlLower.endsWith(".xls") ||
    urlLower.endsWith(".xlsx") ||
    (urlLower.includes("docs.google") && urlLower.includes("spreadsheets"))
  ) {
    return () => <IconSheets size={size} />;
  } else if (
    urlLower.endsWith(".docx") ||
    (urlLower.includes("docs.google") && urlLower.includes("document"))
  ) {
    return () => <IconGoogleDocs size={size} />;
  } else if (
    urlLower.endsWith(".pptx") ||
    (urlLower.includes("docs.google") && urlLower.includes("presentation"))
  ) {
    return () => <IconGoogleSlides size={size} />;
  } else if (urlLower.endsWith(".txt")) {
    return () => <IconGoogleDocs size={size} />;
  } else if (urlLower.endsWith(".html")) {
    return null;
  }

  // check for content type now
  contentType = contentType?.toLowerCase().split(";")[0];
  switch (contentType) {
    case "video":
      return () => <IconYoutube />;
    case "application/pdf":
      return () => <IconPDF style={{ fill: "#F40F02" }} size={12} />;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.oasis.opendocument.spreadsheet":
      return () => <IconSheets />;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return () => <IconGoogleDocs />;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return () => <IconGoogleSlides />;
    case "text/plain":
      return () => <IconGoogleDocs />;
    case "text/html":
      return null;
    default:
      return () => <IconGlobeNet size={12} />;
  }
};

function extractLastPathSegment(str: string) {
  // Extract the last segment of the path
  const parts = str.split("/");
  return parts[parts.length - 1];
}

export function extractFileDetails(str: string) {
  // Extract the last path segment
  const lastSegment = extractLastPathSegment(str);

  // Regular expression to match the last file extension after the final dot
  const fileFormatRegex = /\.([a-zA-Z0-9]+)(\?.*)?$/;
  const match = lastSegment.match(fileFormatRegex);

  if (match) {
    // Extract the extension and the main string without the extension
    const extension = "." + match[1];
    const mainString = lastSegment.slice(0, -extension.length);
    return { mainString, extension };
  } else {
    // No extension found
    return { mainString: lastSegment, extension: null };
  }
}

export function extractMainDomain(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostName = parsedUrl.hostname;
    const hostnameParts = hostName.split(".");

    if (hostnameParts.length >= 2) {
      const siteName = hostnameParts.slice(-2, -1)[0];
      const ext = hostnameParts.slice(-1)[0];
      if (hostName.includes("google"))
        return [hostnameParts.slice(-3, -1).join("."), hostName];
      // The main domain is the second last part of the hostname
      return [siteName, siteName + "." + ext];
    }
  } catch (e) {
    console.error("Invalid URL:", e);
    return null;
  }
}

export const fetchUrlMeta = async (url: string) => {
  const response: any = await axios.get(
    `${GOOEY_META_SCRAPPER_API}/fetchUrlMeta?url=${url}`,
  );
  return response?.data || {};
};

// Text Rendering Logic
const getOutputText = (data: any) => {
  const {
    type = "",
    status = "",
    text,
    detail,
    output_text = {},
    raw_output_text = {},
  } = data;
  let out = "";
  if (type === STREAM_MESSAGE_TYPES.MESSAGE_PART) {
    if (text) {
      out = text;
      out = out.replace("🎧 I heard", "🎙️");
      return out;
    }
    out = detail;
  }
  if (type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE && status === "completed") {
    out = output_text[0] || raw_output_text[0];
  }

  // replace 🎧 I heard from out
  out = out.replace("🎧 I heard", "🎙️");
  return out;
};

export const getReactParserOptions = (data: any): HTMLReactParserOptions => ({
  htmlparser2: {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  replace: function (domNode: { attribs: any; children: any; name: string }) {
    if (!domNode.attribs) return;
    if (
      domNode.children.length &&
      domNode.children[0].name === "code" &&
      domNode.children[0].attribs?.class?.includes("language-")
    ) {
      return (
        <CodeBlock
          domNode={domNode.children[0]}
          options={getReactParserOptions(data)}
        />
      );
    }
  },
  transform(reactNode, domNode) {
    if (domNode.type === "text" && data.showSources) {
      return customizedSources(reactNode, domNode, data);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    switch (domNode.name) {
      case "img":
        return customizedImage(reactNode, domNode);
      case "a":
        return customizedLinks(reactNode, domNode, data);
      default:
        return reactNode;
    }
  },
});

const checkLinkInSources = (url: string, data: any): any => {
  const references = data?.references || [];
  const matches = references.filter((reference: any) => reference.url === url);
  matches.length ? matches[0] : null;
};

const customizedImage = (reactNode: any, domNode: any) => {
  if (!reactNode) return reactNode;
  const src = domNode.attribs.src;
  return (
    <a href={src} target="_blank" rel="noreferrer">
      <img src={src} alt={domNode.attribs.alt} />
    </a>
  );
};

const customizedLinks = (reactNode: any, domNode: any, data: any) => {
  if (!reactNode) return reactNode;
  const href = domNode.attribs.href;
  delete domNode.attribs.href;
  let source: any = checkLinkInSources(href, data);
  if (!source) {
    source = {
      title: domNode?.children[0].data || extractLastPathSegment(href),
      url: href,
    };
  }
  return (
    <Link data={source} configColor={data?.linkColor || "default"}>
      {domToReact(domNode.children, getReactParserOptions(data))}
    </Link>
  );
};

const customizedSources = (reactNode: any, domNode: any, data: any) => {
  if (!domNode) return domNode;
  let text = domNode.data || "";

  // match regex pattern[1,2]/[1]/[1][2] in text and replace with custom component (IconButton)
  // and add the text before and after the match to parts final render array
  const matches: any = Array.from(
    new Set(
      (text.match(NUMBER_REFERENCE_REGEX) || []).map((match: string) =>
        parseInt(match.slice(1, -1), 10),
      ),
    ),
  );

  // return the text as it is if no match found
  if (!matches || !matches.length) return reactNode;

  const { references = [] }: any = data;
  const sources = [...references].splice(
    matches[0] - 1,
    matches[matches.length - 1] - matches[0] + 1,
  );

  text = text.replaceAll(NUMBER_REFERENCE_REGEX, "");
  // remove trailing dot and space
  if (text[text.length - 1] === "." && text[text.length - 2] === " ") {
    text = text.slice(0, -2) + ".";
  }

  return (
    <React.Fragment>
      {text}{" "}
      {!!references.length && (
        <CollapsibleButton>
          <Sources data={sources} isInline />
        </CollapsibleButton>
      )}
    </React.Fragment>
  );
};

export const formatTextResponse = (
  data: any,
  linkColor: string,
  showSources: boolean,
) => {
  const body = getOutputText(data);
  if (!body) return "";
  const rawHtml = marked.parse(body, {
    async: false,
    breaks: true,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    silent: false,
    tokenizer: null,
    walkTokens: null,
  });
  const parsedElements = parse(
    rawHtml as string,
    getReactParserOptions({
      ...data,
      showSources,
      linkColor,
    }),
  );
  return parsedElements;
};

export const getFeedbackButtonIcon = (title: string, isFilled: boolean) => {
  switch (title) {
    case "FEEDBACK_THUMBS_UP":
      return isFilled ? (
        <IconThumbsUpFilled size={12} className="text-muted" />
      ) : (
        <IconThumbsUp size={12} className="text-muted" />
      );
    case "FEEDBACK_THUMBS_DOWN":
      return isFilled ? (
        <IconThumbsDownFilled size={12} className="text-muted" />
      ) : (
        <IconThumbsDown size={12} className="text-muted" />
      );
    default:
      return null;
  }
};

export function truncateMiddle(str: string, charLimit: number) {
  // Early return if the string length is within the limit
  if (str.length <= charLimit) {
    return str;
  }

  const ellipsis = "...";
  const ellipsisLength = ellipsis.length;
  const charsToShow = charLimit - ellipsisLength;

  // Calculate the number of characters to show from the start and end
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  // Return the truncated string
  return str.slice(0, frontChars) + ellipsis + str.slice(-backChars);
}

export function isGoogleDocsEmbeddable(input: string): boolean {
  const supportedMimeTypes = new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "application/rtf",
    "text/csv",
  ]);

  const supportedExtensions = new Set([
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".xls",
    ".xlsx",
    ".txt",
    ".rtf",
  ]);

  // MIME type
  if (input.includes("/") && !input.startsWith("http")) {
    return supportedMimeTypes.has(input);
  }

  try {
    const url = new URL(input);
    let pathname = url.pathname.toLowerCase();

    // Remove trailing slash if present
    if (pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Extract filename from path
    const filename = pathname.split("/").pop() || "";

    // Check if the filename ends with any of the supported extensions
    let match = false;
    for (const ext of supportedExtensions) {
      if (filename.endsWith(ext)) {
        match = true;
        break;
      }
    }
    return match;
  } catch {
    return false;
  }
}
export const getEmbedUrl = (url: string) => {
  try {
    // Check if it's a YouTube URL
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      // Return the embedded YouTube URL format
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    if (isGoogleDocsEmbeddable(url)) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
    }

    // Return original
    return url;
  } catch (error) {
    console.error("Error processing URL:", error);
    return url;
  }
};
export function renderImageInIframe(imgBlobUrl: string) {
  const html = `
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
          }
          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${imgBlobUrl}" />
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}
