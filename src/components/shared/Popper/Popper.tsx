import { useState } from "react";
import { createPortal } from "react-dom";
import { addInlineStyle } from "src/addStyles";
import style from "./popper.scss?inline";

addInlineStyle(style);

type PopperDirection = {
  x: "left" | "right" | "center" | string;
  y: "top" | "bottom" | "center" | string;
};

interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ModalContent?: any;
  direction?: PopperDirection;
  showModal: boolean;
  ModalProps?: Record<string, any>;
}

const getModalCoordinates = (
  containerRef: HTMLElement,
  direction: PopperDirection
) => {
  const containerCoordinates = containerRef.getBoundingClientRect();
  let translateX = "0px";
  let translateY = "0px";
  const x = direction.x;
  const y = direction.y;
  const modalCoordinates = {
    top: 0,
    left: 0,
    transform: "none",
  };
  switch (x) {
    case "left":
      modalCoordinates.left =
        containerCoordinates.left - containerCoordinates.width;
      translateX = "calc(-50% - 12px)";
      break;
    case "right":
      modalCoordinates.left = containerCoordinates.right;
      translateX = "12px";
      break;
    case "center":
      modalCoordinates.left =
        containerCoordinates.left + containerCoordinates.width / 2;
      modalCoordinates.transform = "translate(-50%, 12px)";
      translateY = "12px";
      translateX = "-50%";
      break;
  }

  switch (y) {
    case "top":
      modalCoordinates.top = containerCoordinates.top - 12;
      if (x === "center") modalCoordinates.transform = "translate(-50%, -100%)";
      else modalCoordinates.transform = "translate(0, -100%)";
      translateY = "0";
      if (translateX === "0") translateX = "-100%";
      break;
    case "bottom":
      modalCoordinates.top = containerCoordinates.bottom;
      break;
    case "center":
      modalCoordinates.top =
        containerCoordinates.top + containerCoordinates.height / 2;
      translateY = "-50%";
      if (translateX === "0") translateX = "12px";
      break;
  }
  modalCoordinates.transform = `translate(${translateX}, ${translateY})`;
  return modalCoordinates;
};

const Modal = ({
  containerRef,
  direction,
  style,
  className = "",
  ModalContent,
  ...restProps
}: {
  ModalContent: any;
  containerRef: HTMLElement | null;
  direction: PopperDirection;
  style?: React.CSSProperties;
  className?: string;
}) => {
  if (!containerRef) return null;
  const modalCoordinates = getModalCoordinates(containerRef, direction);
  if (!ModalContent) return null;
  return (
    <div
      className={(className += " gooey-modal")}
      style={{
        ...style,
        ...modalCoordinates,
      }}
      {...restProps}
    >
      {ModalContent()}
    </div>
  );
};

const GooeyPopper = (props: PopperProps) => {
  const {
    ModalContent = () => null,
    children,
    direction = {
      x: "center",
      y: "bottom",
    },
    showModal,
    ModalProps,
    ...restProps
  } = props;

  const [refContainer, setRefContainer] = useState<HTMLElement | null>(null);
  return (
    <div
      className="gooey-clipping-container"
      ref={setRefContainer}
      {...restProps}
    >
      {children}
      {showModal &&
        createPortal(
          <Modal
            containerRef={refContainer}
            direction={direction}
            ModalContent={ModalContent as React.FC<any>}
            {...ModalProps}
          />,
          gooeyShadowRoot?.querySelector(".gooey-embed-container") ||
            (document.body as Element)
        )}
    </div>
  );
};

export default GooeyPopper;
