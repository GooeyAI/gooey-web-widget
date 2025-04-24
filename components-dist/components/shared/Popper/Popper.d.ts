type PopperDirection = {
    x: "left" | "right" | "center" | string;
    y: "top" | "bottom" | "center" | string;
};
interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    ModalContent?: any;
    direction?: PopperDirection;
    showModal: boolean;
    ModalProps?: Record<string, any>;
    gooeyShadowRoot?: ShadowRoot | null;
}
declare const GooeyPopper: (props: PopperProps) => import("react/jsx-runtime").JSX.Element;
export default GooeyPopper;
