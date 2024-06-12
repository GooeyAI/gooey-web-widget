import { useState } from "react";
import IconCaretUp from "src/assets/SvgIcons/IconCaretUp";
import IconButton from "./IconButton";
import clsx from "clsx";

const CollapsibleButton = ({ children, ...restProps }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <span
      className={clsx(
        "collapsible-button",
        isExpanded && "collapsible-button-expanded"
      )}
    >
      <IconButton
        {...restProps}
        variant=""
        id="expand-collapse-button"
        className="bg-light gp-4"
        onClick={(e) => {
          if (restProps?.onClick) restProps?.onClick(e);
          toggleExpansion();
        }}
      >
        <IconCaretUp size={12} />
      </IconButton>
      {isExpanded && (
        <div
          className={clsx(
            "collapsed-area",
            isExpanded && "collapsed-area-expanded"
          )}
        >
          {children}
        </div>
      )}
    </span>
  );
};

export default CollapsibleButton;
