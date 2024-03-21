import clsx from "clsx";
import { ButtonProps } from "./Button";

const IconButton = ({
  className,
  variant = "text",
  onClick,
  ...rest
}: ButtonProps) => {
  const btnClasses = clsx(
    `button-${variant?.toLowerCase()}`,
    className
  );
  return (
    <button {...rest} className={btnClasses} onMouseDown={onClick}>
      {rest.children}
    </button>
  );
};

export default IconButton;
