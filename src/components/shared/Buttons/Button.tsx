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
  RightIconComponent?: React.FC<any>;
  showIconOnHover?: boolean;
  hideOverflow?: boolean;
}

const Button = ({
  // size = "medium",
  variant = "text",
  className = "",
  onClick,
  RightIconComponent,
  showIconOnHover,
  hideOverflow,
  ...rest
}: ButtonProps) => {
  const variantClasses = `button-${variant?.toLowerCase()}`;

  return (
    <button
      {...rest}
      onMouseDown={onClick}
      className={variantClasses + " " + className}
    >
      <div
        className={clsx(
          "pos-relative w-100 h-100",
          hideOverflow && "btn-hide-overflow"
        )}
      >
        {rest.children}
        {RightIconComponent && (
          <div
            className={clsx(
              "btn-icon right-icon",
              showIconOnHover && "icon-hover"
            )}
          >
            <RightIconComponent />
          </div>
        )}
        {hideOverflow && <div className="button-right-blur" />}
      </div>
    </button>
  );
};

export default Button;
