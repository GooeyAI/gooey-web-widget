import { ReactNode } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "medium" | "small" | "large";
    children?: ReactNode;
    className?: string;
    variant?: "filled" | "contained" | "outlined" | "text" | "text-alt";
    RightIconComponent?: React.FC<any>;
    showIconOnHover?: boolean;
    hideOverflow?: boolean;
}
declare const Button: ({ variant, className, onClick, RightIconComponent, showIconOnHover, hideOverflow, ...rest }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
