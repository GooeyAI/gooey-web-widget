import clsx from "clsx";
import IconCheck from "src/assets/SvgIcons/IconCheck";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconButton from "src/components/shared/Buttons/IconButton";
import GooeyTooltip from "src/components/shared/Tooltip";
import { useCopyFeedback } from "src/components/shared/useCopyFeedback";
import { ACTION_ICON_SIZE } from "../constants";

/**
 * The copy control in a message's action row, on the response and the prompt
 * alike. It owns the whole "Copied" acknowledgement — the tick, the tooltip
 * that pins itself open to say so, and the timer that puts both back — so a
 * caller only has to say what copying means for its own message.
 */
export default function CopyButton({
  onCopy,
  label = "Copy",
  className,
}: {
  // Passed the click, because copying a rendered response needs the button
  // element to find the message in the shadow tree. Read `currentTarget`
  // before awaiting anything: React clears it once the handler returns.
  onCopy: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  label?: string;
  className?: string;
}) {
  const { copied, signalCopied } = useCopyFeedback();

  return (
    <GooeyTooltip text={copied ? "Copied" : label} forceShow={copied}>
      <IconButton
        className={clsx("text-muted", className)}
        aria-label={label}
        onClick={async (event) => {
          await onCopy(event);
          signalCopied();
        }}
      >
        {copied ? (
          <IconCheck size={ACTION_ICON_SIZE} />
        ) : (
          <IconCopy size={ACTION_ICON_SIZE} />
        )}
      </IconButton>
    </GooeyTooltip>
  );
}
