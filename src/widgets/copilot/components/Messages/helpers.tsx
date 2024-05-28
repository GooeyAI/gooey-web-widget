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

const fetchUrlMeta = async (url: string, title: string): Promise<any> => {
  try {
    const response: any = await axios.get(url);
    const contentType =
      response?.headers.get("content-type") || "url/undefined";
    if (contentType.includes("pdf" || title.includes("pdf"))) return "pdf";
    if (contentType.includes("csv")) return "sheets";
    return "default";
  } catch (err) {
    console.error(err);
    if (title.includes("pdf")) return "pdf";
    if (title.includes("csv")) return "csv";
    return "default";
  }
};

export const fetchSourcesMeta = async (sources: any) => {
  const sourcesData = await Promise.all(
    sources.map(async (source: any) => {
      const iconType: "pdf" | "sheets" | "docs" | "default" =
        await fetchUrlMeta(source.url, source?.title);

      return { ...source, iconType };
    })
  );
  return sourcesData;
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
        <IconThumbsUpFilled className="text-muted" />
      ) : (
        <IconThumbsUp className="text-muted" />
      );
    case "FEEDBACK_THUMBS_DOWN":
      return isFilled ? (
        <IconThumbsDownFilled className="text-muted" />
      ) : (
        <IconThumbsDown className="text-muted" />
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

export const sanitizeReferences = (data: any) => {
  // remove items from references which are not in output_text
  const { output_text = [], references = [] } = data;
  const outputText = output_text[0] || "";
  const urlPattern = /\b(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\b/g;
  const urlsInResponse = [...new Set(outputText.match(urlPattern))];
  if (!urlsInResponse.length) return [];
  return references.filter(({ url }: any) => {
    if (url.endsWith("/")) url = url.slice(0, -1);
    return urlsInResponse.indexOf(url) !== -1;
  });
};
