import { ReactNode } from "react";

import { addInlineStyle } from "src/addStyles";
import style from "./buttons.scss?inline";
import clsx from "clsx";
addInlineStyle(style);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "medium" | "small" | "large";
  children?: ReactNode;
  className?: string;
  variant?: "filled" | "contained" | "outlined" | "text" | "text-alt";
  RightIconComponent?: React.FC<any>;
  LeftIconComponent?: React.FC<any>;
  showIconOnHover?: boolean;
  hideOverflow?: boolean;
  isPressed?: boolean;
}

const Button = ({
  // size = "medium",
  variant = "text",
  className = "",
  onClick,
  RightIconComponent,
  LeftIconComponent,
  showIconOnHover,
  hideOverflow,
  isPressed,
  ...rest
}: ButtonProps) => {
  const variantClasses = `button-${variant?.toLowerCase()}`;

  return (
    <button
      {...rest}
      onMouseDown={onClick}
      className={clsx(variantClasses, className, isPressed && "depressed")}
    >
      <div
        className={clsx(
          "pos-relative w-100 h-100",
          hideOverflow && "btn-hide-overflow",
        )}
      >
        {LeftIconComponent && (
          <div
            className={clsx(
              "btn-icon-left",
              "d-flex items-center",
              showIconOnHover && "icon-hover",
            )}
            style={{
              width: "fit-content",
              gap: "4px",
            }}
          >
            <LeftIconComponent />
            {rest.children}
          </div>
        )}
        {!RightIconComponent && !LeftIconComponent && (rest.children)}
        {RightIconComponent && (
          <div
            className={clsx("d-flex items-center",
              showIconOnHover && "icon-hover",
            )}
          >
            {rest.children}
            <span className="btn-icon-right">
              <RightIconComponent />
            </span>
          </div>
        )}

        {hideOverflow && <div className="button-right-blur" />}
      </div>
    </button>
  );
};

export default Button;
