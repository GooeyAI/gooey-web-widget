import React, { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import IconCaretUp from "src/assets/SvgIcons/IconCaretUp";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import SpinLoader from "src/components/shared/SpinLoader";
import { parseTextBody } from "./responseParser";

type Props = {
  body: string;
  closed: boolean;
  isStreaming?: boolean;
};

const ThinkingBlock: React.FC<Props> = ({ body, closed }) => {
  const startedAt = useRef(Date.now());
  const [isExpanded, setIsExpanded] = useState(false);

  const elapsedSec = useMemo(
    () =>
      closed
        ? Math.max(1, Math.floor((Date.now() - startedAt.current) / 1000))
        : null,
    [closed],
  );

  const parsedBody = useMemo(() => parseTextBody(body, {}, "", false), [body]);

  return (
    <details
      open={isExpanded}
      onToggle={(e) => setIsExpanded((e.target as HTMLDetailsElement).open)}
      className="tool-call-card"
    >
      <summary>
        {closed ? (
          <span className="tool-call-icon-emoji">🧠</span>
        ) : (
          <div className="tool-call-loader">
            <SpinLoader size={13} />
          </div>
        )}
        <div className="tool-call-summary-content">
          <span className="font_12_600">
            {closed ? `Thought for ${elapsedSec}s` : "Thinking..."}
          </span>
        </div>
        <div className="tool-call-summary-toggle">
          {isExpanded ? (
            <IconCaretUp size={10} />
          ) : (
            <IconChevronDown size={10} />
          )}
        </div>
      </summary>
      <div className={clsx("tool-call-thinking-body font_12_400 gmt-8")}>
        {parsedBody}
      </div>
    </details>
  );
};

export default ThinkingBlock;
