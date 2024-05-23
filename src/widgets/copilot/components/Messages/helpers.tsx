import axios from "axios";
import { marked } from "marked";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import CodeBlock from "src/components/shared/CodeBlock";
import IconThumbsUp from "src/assets/SvgIcons/IconThumbsUp";
import IconThumbsUpFilled from "src/assets/SvgIcons/IconThumbsUpFilled";
import IconThumbsDownFilled from "src/assets/SvgIcons/IconThumbsDownFilled";
import IconThumbsDown from "src/assets/SvgIcons/IconThumbsDown";

const fetchUrlMeta = async (url: string, title: string): Promise<any> => {
  try {
    const response: any = await axios.get(url, {
      headers: { "cors-origin": "*" },
    });
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

export const fetchSourcesData = async (sources: any) => {
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

function linkifyText(text: string) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace URLs with <a> tags
  return text.replace(urlRegex, function (url: string) {
    return '<a href="' + url + '" target="_blank">' + url + "</a>";
  });
}

export const reactParserOptions: HTMLReactParserOptions = {
  htmlparser2: {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  replace: function (domNode: { attribs: any; children: any }) {
    if (!domNode.attribs) return;
    if (
      domNode.children.length &&
      domNode.children[0].name === "code" &&
      domNode.children[0].attribs?.class?.includes("language-")
    ) {
      return (
        <CodeBlock domNode={domNode.children[0]} options={reactParserOptions} />
      );
    }

    // TODO - Replace <a> tags with <Link> components
  },
};

export const formatTextResponse = (data: any) => {
  const body = getOutputText(data);
  if (!body) return "";
  const rawHtml = marked.parse(linkifyText(body), {
    gfm: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    headerIds: false,
    mangle: false,
    breaks: true,
  });
  const parsedElements = parse(rawHtml as string, reactParserOptions);
  return parsedElements;
};

export const getFeedbackButtonIcon = (title: string, isFilled: boolean) => {
  switch (title) {
    case "FEEDBACK_THUMBS_UP":
      return isFilled ? <IconThumbsUpFilled className='text-muted' /> : <IconThumbsUp className='text-muted' />;
    case "FEEDBACK_THUMBS_DOWN":
      return isFilled ? <IconThumbsDownFilled className='text-muted' /> : <IconThumbsDown className='text-muted' />;
    default:
      return null;
  }
};
