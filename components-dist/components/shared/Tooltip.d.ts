type TooltipDirection = "top" | "bottom" | "left" | "right";
declare const GooeyTooltip: ({ text, children, direction, disabled, }: {
    text?: string;
    children: JSX.Element;
    direction?: TooltipDirection;
    disabled?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default GooeyTooltip;
