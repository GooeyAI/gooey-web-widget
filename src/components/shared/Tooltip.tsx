import { useRef, useState } from "react";
import { addInlineStyle } from "src/addStyles";
import GooeyPopper from "./Popper/Popper";
import style from "./tooltip.scss?inline";

addInlineStyle(style);

/** Where to put the tooltip, or "auto" to give it whichever side has room. */
type TooltipDirection = "top" | "bottom" | "left" | "right" | "auto";

// Clears the arrow's overhang, so the point sits next to what it names rather
// than on top of it.
const TOOLTIP_OFFSET = 8;

const GooeyTooltip = ({
  text = "This is a tooltip",
  children,
  // Auto by default: a tooltip's anchor is usually a small control near an
  // edge of a narrow embed, where the only side with room is not one a caller
  // can pick in advance. Popper measures and the arrow follows its choice.
  direction = "auto",
  disabled = false,
  forceShow = false,
}: {
  text?: string;
  children: JSX.Element;
  direction?: TooltipDirection;
  disabled?: boolean;
  // Keep the tooltip visible regardless of hover (e.g. transient "Copied!"
  // feedback after a click, which would otherwise dismiss the tooltip).
  forceShow?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef<any>(null);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const eventHandlers = isTouchDevice
  ? {
      onTouchStart: () => null,
      onTouchEnd: () => null,
    }
  : {
      onMouseEnter: () => {
        if (disabled) return;
        timerRef.current = setTimeout(() => {
          setShowModal(true);
          timerRef.current = null;
        }, 300);
      },
      onMouseLeave: () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setShowModal(false);
      },
    };
  return (
    <GooeyPopper
      ModalContent={() => (
        <div className="gp-8">
          <div className="gooey-tooltip-arrow" data-popper-arrow />
          <p className="font_14_500">{text}</p>
        </div>
      )}
      showModal={showModal || forceShow}
      offset={TOOLTIP_OFFSET}
      direction={{
        x:
          direction === "auto"
            ? "auto"
            : direction === "left"
              ? "left"
              : direction === "right"
                ? "right"
                : "center",
        y:
          direction === "auto"
            ? "auto"
            : direction === "top"
              ? "top"
              : direction === "bottom"
                ? "bottom"
                : "center",
      }}
      onClick={(e) => {
        // prevent click/touch event from triggering the tooltip
        e.preventDefault();
        e.stopPropagation();
        e.persist();
        if (timerRef.current) clearTimeout(timerRef.current);
        setShowModal(false);
      }}
      {...eventHandlers}
      aria-label={text}
    >
      {children}
    </GooeyPopper>
  );
};

export default GooeyTooltip;
