import React, { useEffect, useMemo, useRef, useState } from "react";
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

function useSmoothedText(target: string, isStreaming: boolean): string {
  const [displayed, setDisplayed] = useState<string>(() =>
    isStreaming ? "" : target,
  );
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    if (!isStreaming) return;
    let raf = 0;
    const tick = () => {
      setDisplayed((prev) => {
        const tgt = targetRef.current;
        if (!tgt.startsWith(prev)) return tgt;
        if (prev.length >= tgt.length) return prev;
        return tgt.slice(0, prev.length + 4);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isStreaming]);

  return isStreaming ? displayed : target;
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
  const displayed = useSmoothedText(rawText, isRunning);
  const segments = useMemo(() => splitThinkSegments(displayed), [displayed]);

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
