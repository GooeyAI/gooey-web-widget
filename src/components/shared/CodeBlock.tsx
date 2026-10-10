import {
  DOMNode,
  HTMLReactParserOptions,
  attributesToProps,
} from "html-react-parser";
import { Highlight, themes } from "prism-react-renderer";
import clsx from "clsx";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconCheck from "src/assets/SvgIcons/IconCheck";
import { useCopyFeedback } from "./useCopyFeedback";
import IconButton from "./Buttons/IconButton";

function getTextBody(domNode: {
  attribs: { [key: string]: string };
  children: DOMNode[];
}) {
  let body = "";

  const child = domNode.children[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  body = child.data;
  return body.trim();
}

const CodeHeader = ({ body = "", language = "" }) => {
  const { copied, signalCopied } = useCopyFeedback();
  if (!body) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      signalCopied();
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className="bg-darkGrey text-white d-flex align-center justify-between gp-2"
      style={{ borderRadius: "8px 8px 0 0" }}
    >
      <p className="font_12_500 gml-4" style={{ margin: 0 }}>
        {language}
      </p>
      <IconButton
        onClick={handleCopy}
        className="font_12_500 text-white gp-4 d-flex align-center"
        variant="text"
        aria-label={copied ? "Copied" : "Copy"}
      >
        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
      </IconButton>
    </div>
  );
};
function CodeBlock({
  domNode,
}: {
  domNode: { attribs: { [key: string]: string }; children: DOMNode[] };
  options: HTMLReactParserOptions;
}) {
  const body = getTextBody(domNode);
  const language: string = domNode?.attribs?.class.split("-").pop() || "python";
  const codeProps = attributesToProps(domNode.attribs);
  return (
    <div className="gmb-4">
      <CodeHeader body={body} language={language} />
      <code
        {...codeProps}
        className={clsx(codeProps?.className, "gooey-code-block")}
      >
        <Highlight theme={themes.vsDark} code={body} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className={className}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </code>
    </div>
  );
}

export default CodeBlock;
