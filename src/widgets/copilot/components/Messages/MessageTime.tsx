import clsx from "clsx";
import { addInlineStyle } from "src/addStyles";
import GooeyTooltip from "src/components/shared/Tooltip";
import { formatFullTimestamp, formatMessageTime } from "./helpers";
import style from "./messageTime.scss?inline";

addInlineStyle(style);

/**
 * When a message happened, and on a response that reports one, how long it
 * took: "6:09 PM", "Aug 3", or "15s · Aug 3". A prompt is the same label
 * without a duration — the two rows say the same kind of thing about their own
 * half of a turn, so they say it the same way.
 *
 * The label states the least it can and still be unambiguous; the tooltip
 * spells the moment out in full, which is what someone comparing a reply
 * against a log, a report or their own memory needs without it cluttering
 * every row. Duration and stamp share one label and one tooltip because
 * between them they describe a single run.
 */
export function MessageTimeLabel({
  createdAt,
  runTimeStr = "",
  className,
}: {
  createdAt?: string;
  runTimeStr?: string;
  className?: string;
}) {
  const label = [runTimeStr, formatMessageTime(createdAt)]
    .filter(Boolean)
    .join(" · ");
  if (!label) return null;

  const tooltip = describeRun(runTimeStr, createdAt);
  if (!tooltip) return <MetaLabel className={className}>{label}</MetaLabel>;
  return (
    <GooeyTooltip text={tooltip}>
      <MetaLabel className={className}>{label}</MetaLabel>
    </GooeyTooltip>
  );
}

/**
 * "Generated in 15s at 9:15 PM, Aug 3, 2025", less whichever part is unknown.
 * Without a duration — which most deployments do not show — the moment alone
 * is still worth saying, because the label beside it is an abbreviation of it.
 */
function describeRun(runTimeStr: string, createdAt?: string): string {
  const moment = formatFullTimestamp(createdAt);
  if (!runTimeStr) return moment;
  return moment
    ? `Generated in ${runTimeStr} at ${moment}`
    : `Generated in ${runTimeStr}`;
}

/** The grey supporting text in a message's action row (time, run time). */
function MetaLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={clsx("gooey-meta-label font_12_400 text-muted", className)}>
      {children}
    </span>
  );
}
