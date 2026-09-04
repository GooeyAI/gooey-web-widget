import clsx from "clsx";
import { useEffect, useState } from "react";
import GooeyTooltip from "src/components/shared/Tooltip";
import { formatMessageTime, formatRelativeTime } from "./helpers";

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;

/**
 * A message's supporting time text, shown as an age ("12s ago") with the exact
 * clock time a hover away. The age is what a reader of a conversation actually
 * wants — how fresh is this? — and the tooltip keeps the precise answer for
 * the rarer times that one matters.
 *
 * A run duration, when there is one, shares the same label and the same
 * tooltip: they describe one event between them, so splitting them into two
 * hover targets would only make the row fussier to read.
 */
export function MessageTimeLabel({
  createdAt,
  runTimeStr = "",
  className,
  direction = "top",
}: {
  createdAt?: string;
  runTimeStr?: string;
  className?: string;
  direction?: "top" | "bottom" | "left" | "right";
}) {
  const relativeStr = useRelativeTime(createdAt);
  const label = [relativeStr, runTimeStr].filter(Boolean).join(" · ");
  if (!label) return null;

  const tooltip = [
    formatMessageTime(createdAt),
    runTimeStr && `Completed in ${runTimeStr}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <GooeyTooltip text={tooltip} direction={direction}>
      <MetaLabel className={className}>{label}</MetaLabel>
    </GooeyTooltip>
  );
}

/**
 * Keeps a relative time honest by re-rendering it as it ages.
 *
 * The tick follows the coarsest digit on screen, so a message minted seconds
 * ago updates every second while an old one — the overwhelming majority in any
 * loaded conversation — costs nothing and holds no timer at all.
 */
function useRelativeTime(iso?: string): string {
  const [now, setNow] = useState(() => Date.now());
  const createdAt = iso ? new Date(iso).getTime() : NaN;
  const tickMs = tickMsFor(now - createdAt);

  useEffect(() => {
    if (tickMs === null) return;
    const id = setInterval(() => setNow(Date.now()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);

  return formatRelativeTime(iso, now);
}

// NaN ages (no timestamp, or an unparseable one) fall through to null, as
// every comparison against them is false.
const tickMsFor = (ageMs: number): number | null => {
  if (ageMs < MINUTE_MS) return 1000;
  if (ageMs < HOUR_MS) return 30 * 1000;
  return null;
};

/** The grey supporting text in a message's action row (time, run time). */
export function MetaLabel({
  children,
  className,
}: {
  children?: string;
  className?: string;
}) {
  if (!children) return null;
  return (
    <span className={clsx("font_12_400 text-muted", className)}>
      {children}
    </span>
  );
}
