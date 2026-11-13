import StatusLine, { THINKING_LABEL } from "src/components/shared/StatusLine";
import { MESSAGE_GUTTER } from "../constants";

/**
 * Shown before a reply has any data of its own. Deliberately the same line the
 * message shows once it does exist, in the same gutter, so the run opens with
 * one indicator and never swaps glyph or position partway through.
 */
const ResponseLoader = (props: { show?: boolean }) => {
  if (!props.show) return null;
  return (
    <div className={`gpl-${MESSAGE_GUTTER}`}>
      <StatusLine label={THINKING_LABEL} />
    </div>
  );
};

export default ResponseLoader;
