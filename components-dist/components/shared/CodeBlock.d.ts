import { DOMNode, HTMLReactParserOptions } from 'html-react-parser';

declare function CodeBlock({ domNode, }: {
    domNode: {
        attribs: {
            [key: string]: string;
        };
        children: DOMNode[];
    };
    options: HTMLReactParserOptions;
}): import("react/jsx-runtime").JSX.Element;
export default CodeBlock;
