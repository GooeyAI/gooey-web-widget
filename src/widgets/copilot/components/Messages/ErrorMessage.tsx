import { useState } from "react";
import { addInlineStyle } from "src/addStyles";
import IconButton from "src/components/shared/Buttons/IconButton";
import IconAlertCircle from "src/assets/SvgIcons/IconAlertCircle";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconRetry from "src/assets/SvgIcons/IconRetry";
import GooeyTooltip from "src/components/shared/Tooltip";
import { useMessagesContext } from "src/contexts/hooks";
import style from "./error-message.scss?inline";

addInlineStyle(style);

const ErrorMessage = ({ errorDetail }: { errorDetail?: string }) => {
  const [expanded, setExpanded] = useState(false);
  const { retryLastQuery } = useMessagesContext();

  return (
    <div className="gooey-error-message d-flex flex-col gap-8 gp-12 br-default">
      <div className="d-flex align-center gap-8 flex-wrap justify-between">
        <div className="d-flex align-center gap-4">
          <span className="gooey-error-icon flex-shrink-0 d-flex align-center">
            <IconAlertCircle size={16} />
          </span>
          <span className="gooey-error-text font_14_400">
            Something went wrong. Try again
          </span>
          <GooeyTooltip text="Retry">
            <IconButton
              className="gooey-error-retry-icon d-flex align-center justify-center"
              onClick={() => retryLastQuery?.()}
            >
              <IconRetry size={14} />
            </IconButton>
          </GooeyTooltip>
          
        </div>
        <div className="d-flex align-center gap-4 gml-auto">
          {errorDetail && (
            <button
              className="gooey-error-details-toggle d-flex align-center gap-4 cr-pointer font_14_400"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide" : "Show"} details
              <span
                className="gooey-error-chevron d-inline-block"
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <IconChevronDown size={12} />
              </span>
            </button>
          )}
        </div>
      </div>

      {expanded && errorDetail && (
        <div className="gooey-error-details gp-8 overflow-x-auto font_14_400">
          <code>{errorDetail}</code>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
