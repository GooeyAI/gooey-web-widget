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
import { CopilotConfigType } from "src/contexts/types";
import IconSheets from "src/assets/SvgIcons/IconSheets";
import IconGoogleDocs from "src/assets/SvgIcons/IconGoogleDocs";
import IconGoogleSlides from "src/assets/SvgIcons/IconGoogleSlides";
import IconPDF from "src/assets/SvgIcons/IconPDF";
import IconYoutube from "src/assets/SvgIcons/IconYoutube";
import IconGlobeNet from "src/assets/SvgIcons/IconGlobeNet";

const GOOEY_META_SCRAPPER_API = "https://gooey-url-meta-scrapper.us-1.gooey.ai";

export const findSourceIcon = (
  contentType: string,
  url: string
): JSX.ElementType | null => {
  const urlLower = url.toLowerCase();
  // try to guess from url first
  if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
    return () => <IconYoutube />;
  }
  if (urlLower.endsWith(".pdf")) {
    return () => <IconPDF style={{ fill: "#F40F02" }} size={12} />;
  } else if (
    urlLower.endsWith(".xls") ||
    urlLower.endsWith(".xlsx") ||
    urlLower.includes("sheets.google")
  ) {
    return () => <IconSheets />;
  } else if (urlLower.endsWith(".docx") || urlLower.includes("docs.google")) {
    return () => <IconGoogleDocs />;
  } else if (urlLower.endsWith(".pptx") || urlLower.includes("/presentation")) {
    return () => <IconGoogleSlides />;
  } else if (urlLower.endsWith(".txt")) {
    return () => <IconGoogleDocs />;
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
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      "application/vnd.oasis.opendocument.spreadsheet":
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

export const fetchUrlMeta = async (url: string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${GOOEY_META_SCRAPPER_API}/fetchUrlMeta?url=${url}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
  }
};

// Text Rendering Logic
const getOutputText = (data: any) => {
  const { type = "", status = "", text, detail, output_text = {} } = data;
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
    out = output_text[0];
  }

  // replace 🎧 I heard from out
  out = out.replace("🎧 I heard", "🎙️");
  return out;
};

export const getReactParserOptions = (
  config: CopilotConfigType
): HTMLReactParserOptions => ({
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
          options={getReactParserOptions(config)}
        />
      );
    }

    // Replace <a> tags with <Link> component
    if (
      domNode.children.length &&
      (domNode?.name === "a" || domNode.children[0].name === "a")
    ) {
      const href = domNode.attribs.href;
      delete domNode.attribs.href;
      return (
        <Link
          to={href}
          configColor={config?.branding?.colors?.primary || "default"}
        >
          {domToReact(domNode.children, getReactParserOptions(config))}
        </Link>
      );
    }
  },
});

export const formatTextResponse = (data: any, config: CopilotConfigType) => {
  const body = getOutputText(data);
  if (!body) return "";
  const rawHtml = marked.parse(body, {
    async: false,
    breaks: false,
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
    getReactParserOptions(config)
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

function detectNumberReference(str: string) {
  /// Define the regex pattern to match [2], [1,2,4], or [1, 2]
  const regex = /\[\d+(,\s*\d+)*\]/g;

  // Use the regex to find matches
  const matches = str.match(regex);

  // If no matches found, return an empty array
  if (!matches) {
    return [];
  }

  // Extract numbers from each match
  const numbers = matches.map((match) => {
    // Remove the square brackets and split by comma
    return match
      .slice(1, -1)
      .split(",")
      .map((num) => parseInt(num.trim(), 10));
  });

  // Flatten the array of arrays into a single array
  return numbers.flat();
}

export const sanitizeReferences = (data: any) => {
  // remove items from references which are not in output_text
  const { output_text = [], references = [] } = data;
  const outputText = output_text[0] || "";
  const numberReferences = detectNumberReference(outputText).sort();
  const urlPattern = /\b(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\b/g;
  const urlsInResponse = [...new Set(outputText.match(urlPattern))];
  if (numberReferences.length === 0 && urlsInResponse.length === 0) return [];
  const indices = numberReferences.map((num) => num - 1);

  // check ref numbers and remove the ones which are not in output_text by index
  let rejectedReferences: any = [];
  const newSources = references
    .map((_: any, index: number) => {
      if (indices.includes(index))
        return {
          ..._,
          refNumber: numberReferences[index - rejectedReferences.length],
        };
      else {
        rejectedReferences.push(_);
        return undefined;
      }
    })
    .filter((source: any) => source !== undefined);

  // removed all the un-indexed references
  if (!urlsInResponse.length) return newSources;

  // check urls in response and add them to sources
  rejectedReferences = rejectedReferences.filter(({ url }: any) => {
    if (url.endsWith("/")) url = url.slice(0, -1);
    return urlsInResponse.indexOf(url) !== -1;
  });
  return [...newSources, ...rejectedReferences];
};
