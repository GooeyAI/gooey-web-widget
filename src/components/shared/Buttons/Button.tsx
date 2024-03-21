import { ReactNode } from "react";
import clsx from "clsx";
import './buttons.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  size?: "medium" | "small" | "large";
  children?: ReactNode;
  className?: string;
  variant?: "filled" | "contained" | "outlined" | "text";
}

const Button = ({
  size = "medium",
  variant = "text",
  className = "",
  onClick,
  ...rest
}: ButtonProps) => {
  const btnClasses = clsx(
    `button-${variant?.toLowerCase()}`,
    className
  );

  return (
    <button {...rest} onMouseDown={onClick} className={btnClasses}>
      {rest.children}
    </button>
  );
};

export default Button;
