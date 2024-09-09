import { useRef, useState } from "react";
import GooeyPopper from "./Popper/Popper";

type TooltipDirection = "top" | "bottom" | "left" | "right";
const TOOLTIP_INSET = "-6px";
const getArrowStyles = (direction: TooltipDirection) => {
  switch (direction) {
    case "top":
      return {
        borderTop: "10px solid white",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        left: "50%",
        bottom: TOOLTIP_INSET,
        transform: "translateX(-50%)",
      };
    case "bottom":
      return {
        borderBottom: "10px solid white",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        left: "50%",
        top: TOOLTIP_INSET,
        transform: "translateX(-50%)",
      };
    case "left":
      return {
        borderLeft: "10px solid white",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        right: TOOLTIP_INSET,
        transform: "translateY(-50%)",
        top: "50%",
      };
    case "right":
      return {
        borderRight: "10px solid white",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        left: TOOLTIP_INSET,
        transform: "translateY(-50%)",
        top: "50%",
      };
    default:
      return {
        borderTop: "10px solid white",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        left: "50%",
        bottom: TOOLTIP_INSET,
        transform: "translateX(-50%)",
      };
  }
};

const GooeyTooltip = ({
  text = "This is a tooltip",
  children,
  direction = "right",
  disabled = false,
}: {
  text?: string;
  children: JSX.Element;
  direction?: TooltipDirection;
  disabled?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef<any>(null);
  const arrowStyles = getArrowStyles(direction);
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
        <>
          <div
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              ...arrowStyles,
            }}
          />
          <p className="font_14_500">{text}</p>
        </>
      )}
      showModal={showModal}
      direction={{
        x:
          direction === "left"
            ? "left"
            : direction === "right"
            ? "right"
            : "center",
        y:
          direction === "top"
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
