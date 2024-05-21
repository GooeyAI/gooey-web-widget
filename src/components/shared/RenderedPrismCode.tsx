import {
  DOMNode,
  HTMLReactParserOptions,
  attributesToProps,
} from "html-react-parser";
import { Highlight, themes } from "prism-react-renderer";

function getTextBody(domNode: Element) {
  let body = "";
  const child = domNode.children[0];
  body = child.data;
  return body;
}

function RenderedPrismCode({
  domNode,
}: {
  domNode: DOMNode;
  options: HTMLReactParserOptions;
}) {
  const body = getTextBody(domNode);
  return (
    <code {...attributesToProps(domNode.attribs)}>
      <Highlight theme={themes.github} code={body} language="python">
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
  );
}

export default RenderedPrismCode;
