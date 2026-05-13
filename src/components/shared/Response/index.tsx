import React, { Fragment } from "react";
import {
  extractOutputText,
  parseTextBody,
} from "./responseParser";
import { splitThinkSegments } from "./thinkParser";
import ThinkingBlock from "./ThinkingBlock";
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
  const rawText = extractOutputText(data);
  const segments = splitThinkSegments(rawText);
  const lastIdx = segments.length - 1;

  const elements = segments.map((seg, idx) => {
    const isLast = idx === lastIdx;
    if (seg.kind === "think") {
      if (seg.body.trim() === "") return null;
      const isBodyStreaming = !!isStreaming && isLast && !seg.closed;
      return (
        <ThinkingBlock
          key={idx}
          body={seg.body}
          closed={seg.closed}
          data={data}
          linkColor={linkColor || ""}
          showSources={showSources || false}
          isStreaming={isBodyStreaming}
        />
      );
    }
    const parsed = parseTextBody(
      seg.body,
      data,
      linkColor || "",
      showSources || false,
    );
    if (isStreaming && isLast) {
      return (
        <div key={idx} className="response-streaming">
          {parsed}
        </div>
      );
    }
    return <Fragment key={idx}>{parsed}</Fragment>;
  });

  return (
    <div
      className="font_16_400 pos-relative markdown text-reveal-container mw-100 overflow-hidden"
      id={id}
      {...restProps}
    >
      {elements}
    </div>
  );
};

export default GooeyTextResponse;
