import {
  DOMNode,
  HTMLReactParserOptions,
  attributesToProps,
} from "html-react-parser";
import { Highlight, themes } from "prism-react-renderer";
import Button from "./Buttons/Button";
import { useState } from "react";

function getTextBody(domNode: {
  attribs: { [key: string]: string };
  children: DOMNode[];
}) {
  let body = "";

  const child = domNode.children[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  body = child.data;
  return body;
}

const CodeHeader = ({ body = "", language = "" }) => {
  const [buttonText, setButtonText] = useState("Copy");
  if (!body) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setButtonText("Copied");
      setTimeout(() => {
        setButtonText("Copy");
      }, 5000); // Reset button text after 5 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className="bg-darkGrey text-white d-flex align-center justify-between gp-4"
      style={{ borderRadius: "8px 8px 0 0" }}
    >
      <p className="font_12_500 gml-4">{language}</p>
      <Button
        onClick={handleCopy}
        className="font_12_500 text-white gp-4"
        variant="text"
      >
        {buttonText}
      </Button>
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
  return (
    <>
      <CodeHeader body={body} language={language} />
      <code
        {...attributesToProps(domNode.attribs)}
        style={{
          borderRadius: "4px",
        }}
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
    </>
  );
}

export default CodeBlock;
