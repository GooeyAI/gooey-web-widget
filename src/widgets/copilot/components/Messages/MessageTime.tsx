import clsx from "clsx";
import { useEffect, useState } from "react";
import { addInlineStyle } from "src/addStyles";
import GooeyTooltip from "src/components/shared/Tooltip";
import { formatMessageTime, formatRelativeTime } from "./helpers";
import style from "./messageTime.scss?inline";

addInlineStyle(style);

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;

/**
 * A message's supporting time text, with the exact clock time a hover away.
 *
 * An age ("12s ago") is what a reader of a conversation wants at a glance —
 * how fresh is this? — but only once per exchange: a reply carries the same
 * age as the prompt directly above it, so `showAge` lets the response drop it
 * and show only how long it took. Either way the tooltip reports both, so the
 * precise reading is never further than a hover.
 *
 * Time and duration share one label and therefore one tooltip: they describe
 * one event between them, and splitting them into two hover targets would only
 * make the row fussier to read.
 */
export function MessageTimeLabel({
  createdAt,
  runTimeStr = "",
  showAge = true,
  className,
  direction = "top",
}: {
  createdAt?: string;
  runTimeStr?: string;
  showAge?: boolean;
  className?: string;
  direction?: "top" | "bottom" | "left" | "right";
}) {
  // Withholding the timestamp also stops the clock: nothing on screen goes
  // stale, so nothing needs a tick.
  const relativeStr = useRelativeTime(showAge ? createdAt : undefined);
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
    <span className={clsx("gooey-meta-label font_12_400 text-muted", className)}>
      {children}
    </span>
  );
}
