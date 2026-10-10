import { useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { createPopper, Placement } from "@popperjs/core";
import { addInlineStyle } from "src/addStyles";
import style from "./popper.scss?inline";
import { ShadowRootContext } from "src/contexts/ShadowRootContext";

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
  /** Gap in px between the modal and its anchor. */
  offset?: number;
}

// Map your direction prop to Popper.js placement
const getPopperPlacement = (direction: PopperDirection): Placement => {
  const { x, y } = direction;
  // "auto" hands the choice to Popper, which takes whichever side has the most
  // room. Worth asking for when no side is inherently right — a modal on a
  // small anchor in a 360px column often has room on only one of them.
  if (x === "auto" || y === "auto") return "auto";
  if (y === "top")
    return x === "left" ? "top-start" : x === "right" ? "top-end" : "top";
  if (y === "bottom")
    return x === "left"
      ? "bottom-start"
      : x === "right"
        ? "bottom-end"
        : "bottom";
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
  offset,
  ...rest
}: {
  ModalContent: () => React.ReactNode;
  referenceElement: HTMLElement | null;
  direction: PopperDirection;
  style?: React.CSSProperties;
  className?: string;
  showModal: boolean;
  offset: number;
}) => {
  const popperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (referenceElement && popperRef.current && showModal) {
      const instance = createPopper(referenceElement, popperRef.current, {
        placement: getPopperPlacement(direction),
        modifiers: [
          { name: "offset", options: { offset: [0, offset] } },
          { name: "preventOverflow", options: { padding: 8 } },
          // Keeps a modal's pointer on its anchor after preventOverflow has slid
          // the modal along that axis, and off the rounded corners. Modals with
          // no `[data-popper-arrow]` child are unaffected.
          { name: "arrow", options: { padding: 8 } },
          {
            name: "flip",
            options: {
              // Only give up on the requested side when that side itself has no
              // room. Flip checks the cross axis too by default, which in a
              // 360px column means a modal merely wider than the space either
              // side of its anchor gets moved beside the anchor instead of
              // above it — while the caller's arrow still points down. Sliding
              // it along that axis is preventOverflow's job, not a reason to
              // change sides.
              altAxis: false,
              fallbackPlacements: ["top", "bottom", "right", "left"],
            },
          },
        ],
      });
      return () => {
        instance.destroy();
      };
    }
  }, [referenceElement, direction, showModal, offset]);

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
  offset = 0,
  ...rest
}: PopperProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const shadowRoot = useContext(ShadowRootContext);
  return (
    <div className="gooey-clipping-container" ref={refContainer} {...rest}>
      {children}
      {showModal &&
        createPortal(
          <Modal
            referenceElement={refContainer.current}
            direction={direction}
            ModalContent={ModalContent}
            showModal={showModal}
            offset={offset}
            {...ModalProps}
          />,
          shadowRoot?.querySelector(".gooey-embed-container") || document.body,
        )}
    </div>
  );
};

export default GooeyPopper;
