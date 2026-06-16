import React, { useEffect, useMemo, useRef, useState } from "react";
import IconCaretUp from "src/assets/SvgIcons/IconCaretUp";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import SpinLoader from "src/components/shared/SpinLoader";
import { parseTextBody } from "./responseParser";

type Props = {
  body: string;
  finished: boolean;
};

const ThinkingToolCall: React.FC<Props> = ({ body, finished }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Only time the block if we observed it while still open — otherwise the
  // message is historical/cached and we can't infer how long thinking took.
  const startRef = useRef<number | null>(finished ? null : Date.now());
  const [elapsedSec, setElapsedSec] = useState<number | null>(null);

  useEffect(() => {
    if (!finished || startRef.current === null || elapsedSec !== null) return;
    setElapsedSec(
      Math.max(1, Math.floor((Date.now() - startRef.current) / 1000)),
    );
  }, [finished, elapsedSec]);

  const parsedBody = useMemo(() => parseTextBody(body, {}, "", false), [body]);

  let label: string;
  if (!finished) label = "Thinking...";
  else if (elapsedSec !== null) label = `Thought for ${elapsedSec}s`;
  else label = "Thoughts";

  return (
    <details
      open={isExpanded}
      onToggle={(e) => setIsExpanded((e.target as HTMLDetailsElement).open)}
      className="tool-call-card"
    >
      <summary>
        {finished ? (
          <span className="tool-call-icon-emoji">🧠</span>
        ) : (
          <div className="tool-call-loader">
            <SpinLoader size={13} />
          </div>
        )}
        <div className="tool-call-summary-content">
          <span className="font_12_600">{label}</span>
        </div>
        <div className="tool-call-summary-toggle">
          {isExpanded ? (
            <IconCaretUp size={10} />
          ) : (
            <IconChevronDown size={10} />
          )}
        </div>
      </summary>
      <div className="tool-call-thinking-body font_12_400 gmt-8">
        {parsedBody}
      </div>
    </details>
  );
};

export default ThinkingToolCall;
