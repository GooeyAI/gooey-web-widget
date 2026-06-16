import React, { useMemo } from "react";
import {
  extractOutputText,
  parseTextBody,
  ResponseData,
} from "./responseParser";
import { splitThinkSegments } from "./thinkParser";
import ThinkingToolCall from "./ThinkingBlock";
import style from "./response.scss?inline";
import { addInlineStyle } from "src/addStyles";
import clsx from "clsx";
addInlineStyle(style);

interface GooeyTextResponseProps {
  data: ResponseData;
  linkColor?: string;
  showSources?: boolean;
  isStreaming?: boolean;
  id?: string;
}

const GooeyTextResponse: React.FC<GooeyTextResponseProps> = ({
  data,
  linkColor = "",
  showSources = false,
  isStreaming,
  id,
  ...restProps
}) => {
  const rawText = extractOutputText(data);
  const segments = useMemo(() => splitThinkSegments(rawText), [rawText]);

  return (
    <div
      className={clsx(
        "font_16_400 pos-relative markdown text-reveal-container mw-100 overflow-hidden",
        isStreaming && "response-streaming",
      )}
      id={id}
      {...restProps}
    >
      {segments.map((seg, i) => {
        if (seg.type === "think") {
          if (seg.body.trim() === "") return null;
          return (
            <ThinkingToolCall key={i} body={seg.body} finished={seg.closed} />
          );
        }
        return (
          <React.Fragment key={i}>
            {parseTextBody(seg.body, data, linkColor, showSources)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default GooeyTextResponse;
