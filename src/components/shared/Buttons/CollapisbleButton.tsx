import { useEffect, useState } from "react";
import IconCaretUp from "src/assets/SvgIcons/IconCaretUp";
import IconButton from "./IconButton";
import clsx from "clsx";
import { useSystemContext } from "src/contexts/hooks";

const CollapsibleButton = ({ children, ...restProps }: any) => {
  const { config } = useSystemContext();
  const [isExpanded, setIsExpanded] = useState<boolean>(
    config?.expandedSources || false,
  );

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (config?.expandedSources) setIsExpanded(config?.expandedSources);
  }, [config?.expandedSources]);
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
      {(isExpanded && !restProps?.disabled) && (
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
