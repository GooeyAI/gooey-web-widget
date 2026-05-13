import React, { useMemo } from "react";
import { extractOutputText, parseTextBody } from "./responseParser";
import { splitThinkSegments } from "./thinkParser";
import ThinkingBlock from "./ThinkingBlock";
import style from "./response.scss?inline";
import { addInlineStyle } from "src/addStyles";
addInlineStyle(style);

interface ResponseData {
  text?: string;
  type?: string;
  status?: string;
  detail?: string;
  output_text?: string[];
  raw_output_text?: string[];
  references?: any[];
}

interface GooeyTextResponseProps {
  data: ResponseData;
  linkColor?: string;
  showSources?: boolean;
  isStreaming?: boolean;
  id?: string;
}

type TextSegmentProps = {
  body: string;
  data: ResponseData;
  linkColor: string;
  showSources: boolean;
  streaming: boolean;
};

const TextSegment = React.memo(
  function TextSegment({
    body,
    data,
    linkColor,
    showSources,
    streaming,
  }: TextSegmentProps) {
    const references = data.references;
    const parsed = useMemo(
      () => parseTextBody(body, data, linkColor, showSources),
      // data is intentionally tracked via references only; other data fields
      // don't affect parse output (see domHandlers.tsx).
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [body, references, linkColor, showSources],
    );
    return (
      <div className={streaming ? "response-streaming" : undefined}>
        {parsed}
      </div>
    );
  },
  (prev, next) =>
    prev.body === next.body &&
    prev.streaming === next.streaming &&
    prev.linkColor === next.linkColor &&
    prev.showSources === next.showSources &&
    prev.data.references === next.data.references,
);

const GooeyTextResponse: React.FC<GooeyTextResponseProps> = ({
  data,
  linkColor,
  showSources,
  isStreaming,
  id,
  ...restProps
}) => {
  const rawText = extractOutputText(data);
  const segments = useMemo(() => splitThinkSegments(rawText), [rawText]);
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
          isStreaming={isBodyStreaming}
        />
      );
    }
    return (
      <TextSegment
        key={idx}
        body={seg.body}
        data={data}
        linkColor={linkColor || ""}
        showSources={showSources || false}
        streaming={!!isStreaming && isLast}
      />
    );
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
