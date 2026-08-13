import React, { useMemo } from "react";
import {
  extractOutputText,
  parseResponseBody,
  ResponseData,
} from "./responseParser";
import clsx from "clsx";
import style from "./response.scss?inline";
import { addInlineStyle } from "src/addStyles";
addInlineStyle(style);

interface GooeyTextResponseProps {
  data: ResponseData;
  linkColor?: string;
  showSources?: boolean;
  isStreaming?: boolean;
  revealText?: boolean;
  id?: string;
}

const GooeyTextResponse: React.FC<GooeyTextResponseProps> = ({
  data,
  linkColor = "",
  showSources = false,
  isStreaming = false,
  revealText = true,
  id,
  ...restProps
}) => {
  const body = extractOutputText(data);
  const references = data.references;
  const parsedElements = useMemo(
    () => parseResponseBody({ text: body, references }, linkColor, showSources),
    [body, linkColor, showSources, references],
  );

  return (
    <div
      className={clsx(
        "font_16_400 pos-relative markdown mw-100 overflow-hidden",
        revealText && "text-reveal-container",
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
