import React, { useMemo } from "react";
import {
  extractOutputText,
  parseTextBody,
  ResponseData,
} from "./responseParser";
import { splitThinkSegments } from "./thinkParser";
import ThinkingBlock from "./ThinkingBlock";
import style from "./response.scss?inline";
import { addInlineStyle } from "src/addStyles";
addInlineStyle(style);

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

const TextSegment = ({
  body,
  data,
  linkColor,
  showSources,
  streaming,
}: TextSegmentProps) => {
  const references = data.references;
  const parsed = useMemo(
    () => parseTextBody(body, data, linkColor, showSources),
    // data is intentionally tracked via references only; other data fields
    // don't affect parse output (see domHandlers.tsx).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [body, references, linkColor, showSources],
  );
  return (
    <div className={streaming ? "response-streaming" : undefined}>{parsed}</div>
  );
};

const GooeyTextResponse: React.FC<GooeyTextResponseProps> = ({
  data,
  linkColor,
  showSources,
  isStreaming,
  id,
  ...restProps
}) => {
  const rawText = extractOutputText(data);
  const isRunning = data.status === "running";
  const segments = useMemo(() => splitThinkSegments(rawText), [rawText]);

  const elements = segments.map((seg) => {
    if (seg.type === "think") {
      if (seg.body.trim() === "") return null;
      return <ThinkingBlock body={seg.body} closed={seg.closed} />;
    }
    return (
      <TextSegment
        body={seg.body}
        data={data}
        linkColor={linkColor || ""}
        showSources={showSources || false}
        streaming={isRunning}
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
