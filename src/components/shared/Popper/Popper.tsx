import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { createPopper, Placement } from "@popperjs/core";
import { addInlineStyle } from "src/addStyles";
import style from "./popper.scss?inline";

addInlineStyle(style);

type PopperDirection = {
  x: "left" | "right" | "center" | string;
  y: "top" | "bottom" | "center" | string;
};

interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ModalContent?: () => React.ReactNode;
  direction?: PopperDirection;
  showModal: boolean;
  ModalProps?: Record<string, any>;
}

// Map your direction prop to Popper.js placement
const getPopperPlacement = (direction: PopperDirection): Placement => {
  const { x, y } = direction;
  if (y === "top") return x === "left" ? "top-start" : x === "right" ? "top-end" : "top";
  if (y === "bottom") return x === "left" ? "bottom-start" : x === "right" ? "bottom-end" : "bottom";
  if (x === "left") return "left";
  if (x === "right") return "right";
  if (x === "center") return "top-start";
  return "bottom";
};

const Modal = ({
  referenceElement,
  direction,
  ModalContent,
  style: styleProp,
  className = "",
  showModal,
  ...rest
}: {
  ModalContent: () => React.ReactNode;
  referenceElement: HTMLElement | null;
  direction: PopperDirection;
  style?: React.CSSProperties;
  className?: string;
  showModal: boolean;
}) => {
  const popperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (referenceElement && popperRef.current && showModal) {
      const instance = createPopper(referenceElement, popperRef.current, {
        placement: getPopperPlacement(direction),
        modifiers: [
          { name: "preventOverflow", options: { padding: 8 } },
          { name: "flip", options: { fallbackPlacements: ["top", "bottom", "right", "left"] } },
        ],
      });
      return () => {
        instance.destroy();
      };
    }
  }, [referenceElement, direction, showModal]);

  if (!referenceElement || !ModalContent || !showModal) return null;
  return (
    <div
      ref={popperRef}
      className={`gooey-modal ${className}`.trim()}
      style={styleProp}
      {...rest}
    >
      {ModalContent()}
    </div>
  );
};

const GooeyPopper = ({
  ModalContent = () => null,
  children,
  direction = { x: "center", y: "bottom" },
  showModal,
  ModalProps,
  ...rest
}: PopperProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  return (
    <div
      className="gooey-clipping-container"
      ref={refContainer}
      {...rest}
    >
      {children}
      {showModal &&
        createPortal(
          <Modal
            referenceElement={refContainer.current}
            direction={direction}
            ModalContent={ModalContent}
            showModal={showModal}
            {...ModalProps}
          />,
          gooeyShadowRoot?.querySelector(".gooey-embed-container") || document.body
        )}
    </div>
  );
};

export default GooeyPopper;
