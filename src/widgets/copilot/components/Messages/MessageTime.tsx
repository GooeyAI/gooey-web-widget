import clsx from "clsx";
import { addInlineStyle } from "src/addStyles";
import GooeyTooltip from "src/components/shared/Tooltip";
import {
  formatClockTime,
  formatMessageDate,
  formatMessageTime,
  isFromToday,
} from "./helpers";
import style from "./messageTime.scss?inline";

addInlineStyle(style);

type LabelProps = {
  createdAt?: string;
  className?: string;
  direction?: TooltipDirection;
};

type TooltipDirection = "top" | "bottom" | "left" | "right";

/**
 * When a prompt was sent: "6:09 PM", trailed by the date on anything older
 * than today. It carries no tooltip because it holds nothing back — the label
 * is already the precise reading.
 */
export function PromptTimeLabel({ createdAt, className }: LabelProps) {
  return (
    <MetaLabel className={className}>{formatMessageTime(createdAt)}</MetaLabel>
  );
}

/**
 * What a response cost and when it landed: "10s · 10:34 PM", or "15s · Aug 3"
 * once a clock time alone would no longer say which day.
 *
 * The pair earns its place in a way an age would not. The duration is only
 * knowable here, and an absolute stamp is what someone comparing a reply
 * against a log, a report or their own memory needs. The two share one label
 * and one tooltip because they describe a single run between them, and the
 * tooltip spells that out in full — nothing there has to be decoded.
 */
export function ResponseTimingLabel({
  createdAt,
  runTimeStr = "",
  className,
  direction = "top",
}: LabelProps & { runTimeStr?: string }) {
  const stamp = isFromToday(createdAt)
    ? formatClockTime(createdAt)
    : formatMessageDate(createdAt);

  return (
    <TooltipLabel
      tooltip={describeRun(runTimeStr, createdAt)}
      className={className}
      direction={direction}
    >
      {[runTimeStr, stamp].filter(Boolean).join(" · ")}
    </TooltipLabel>
  );
}

/**
 * "Generated in 15s at 9:15 PM, Aug 3", less whichever part is unknown — and
 * nothing at all without a duration, since a stamp on its own is already
 * spelled out in the label and a tooltip repeating it would say nothing.
 */
function describeRun(runTimeStr: string, createdAt?: string): string {
  if (!runTimeStr) return "";
  const clock = formatClockTime(createdAt);
  const moment =
    clock && !isFromToday(createdAt)
      ? `${clock}, ${formatMessageDate(createdAt)}`
      : clock;
  return moment
    ? `Generated in ${runTimeStr} at ${moment}`
    : `Generated in ${runTimeStr}`;
}

/** Grey supporting text, explained on hover when there is more to say. */
function TooltipLabel({
  tooltip,
  children,
  className,
  direction,
}: {
  tooltip: string;
  children: string;
  className?: string;
  direction: TooltipDirection;
}) {
  if (!children) return null;
  if (!tooltip) return <MetaLabel className={className}>{children}</MetaLabel>;
  return (
    <GooeyTooltip text={tooltip} direction={direction}>
      <MetaLabel className={className}>{children}</MetaLabel>
    </GooeyTooltip>
  );
}

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
