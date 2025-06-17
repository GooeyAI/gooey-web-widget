import React from "react";
import { parseResponseBody } from "./responseParser";
import clsx from "clsx";
import style from "./response.scss?inline";
import { addInlineStyle } from "src/addStyles";
addInlineStyle(style);

interface GooeyTextResponseProps {
  data: {
    text?: string;
    type?: string;
    status?: string;
    detail?: string;
    output_text?: string[];
    raw_output_text?: string[];
  };
  linkColor?: string;
  showSources?: boolean;
  isStreaming?: boolean;
  id?: string;
}

const GooeyTextResponse: React.FC<GooeyTextResponseProps> = ({
  data,
  linkColor,
  showSources,
  isStreaming,
  id,
  ...restProps
}) => {
  const parsedElements = parseResponseBody(
    data,
    linkColor || "",
    showSources || false,
  );

  return (
    <div
      className={clsx(
        "font_16_400 pos-relative markdown text-reveal-container mw-100 overflow-hidden",
        isStreaming && "response-streaming",
      )}
      id={id}
      {...restProps}
    >
      {parsedElements}
    </div>
  );
};

export default GooeyTextResponse;
