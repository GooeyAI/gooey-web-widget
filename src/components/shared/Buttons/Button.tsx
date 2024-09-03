import { ReactNode } from "react";

import { addInlineStyle } from "src/addStyles";
import style from "./buttons.scss?inline";
import IconButton from "./IconButton";
import clsx from "clsx";
addInlineStyle(style);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "medium" | "small" | "large";
  children?: ReactNode;
  className?: string;
  variant?: "filled" | "contained" | "outlined" | "text" | "text-alt";
  RightIconComponent?: React.FC<{ size: number }>;
  showIconOnHover?: boolean;
}

const Button = ({
  // size = "medium",
  variant = "text",
  className = "",
  onClick,
  RightIconComponent,
  showIconOnHover,
  ...rest
}: ButtonProps) => {
  const variantClasses = `button-${variant?.toLowerCase()}`;

  return (
    <button
      {...rest}
      onMouseDown={onClick}
      className={variantClasses + " pos-relative " + className}
    >
      {rest.children}
      {RightIconComponent && (
        <div
          className={clsx("pos-absolute", showIconOnHover && "icon-hover")}
          style={{
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
          }}
        >
          <IconButton className="text-muted" disabled>
            <RightIconComponent size={18} />
          </IconButton>
        </div>
      )}
    </button>
  );
};

export default Button;
