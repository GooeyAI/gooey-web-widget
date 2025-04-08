type Props = {
    children: JSX.Element | JSX.Element[] | (() => JSX.Element);
    view?: string;
    onViewChange?: (val: string) => void;
    isInline?: boolean;
};
declare const AppLayout: ({ children }: Props) => import("react/jsx-runtime").JSX.Element;
export default AppLayout;
