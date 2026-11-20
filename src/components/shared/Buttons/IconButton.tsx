import clsx from "clsx";
import { ButtonProps } from "./Button";

// An icon has no text for a screen reader to announce, so the name is required.
type IconButtonProps = ButtonProps & { "aria-label": string };

const IconButton = ({
  className,
  variant = "text",
  onClick,
  isPressed,
  ...rest
}: IconButtonProps) => {
  const btnClasses = clsx(`button-${variant?.toLowerCase()}`, className, isPressed && "depressed");
  return (
    <button {...rest} className={btnClasses} onClick={onClick}>
      {rest.children}
    </button>
  );
};

export default IconButton;
