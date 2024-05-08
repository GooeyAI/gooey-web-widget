import { ReactNode } from "react";

import { addInlineStyle } from "src/addStyles";
import style from "./buttons.scss?inline";
addInlineStyle(style);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "medium" | "small" | "large";
  children?: ReactNode;
  className?: string;
  variant?: "filled" | "contained" | "outlined" | "text" | "text-alt";
}

const Button = ({
  // size = "medium",
  variant = "text",
  className = "",
  onClick,
  ...rest
}: ButtonProps) => {
  const variantClasses = `button-${variant?.toLowerCase()}`;

  return (
    <button
      {...rest}
      onMouseDown={onClick}
      className={variantClasses + " " + className}
    >
      {rest.children}
    </button>
  );
};

export default Button;
