import clsx from "clsx";
import { ButtonProps } from "./Button";

const IconButton = ({
  className,
  variant = "text",
  onClick,
  isPressed,
  ...rest
}: ButtonProps) => {
  const btnClasses = clsx(`button-${variant?.toLowerCase()}`, className, isPressed && "depressed");
  return (
    <button {...rest} className={btnClasses} onClick={onClick}>
      {rest.children}
    </button>
  );
};

export default IconButton;
