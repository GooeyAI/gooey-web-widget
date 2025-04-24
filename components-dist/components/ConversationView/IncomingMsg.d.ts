type IncomingMsgProps = {
    data: any;
    id: string;
    showSources: boolean;
    linkColor: string;
    autoPlay?: boolean;
    photoUrl?: string;
    onFeedbackClick: (button: {
        id: string;
        title: string;
    }) => void;
    layoutController?: {
        toggleSecondaryDrawer: (content: any) => void;
    };
};
declare const IncomingMsg: import('react').MemoExoticComponent<({ data, id, showSources, linkColor, autoPlay, photoUrl, onFeedbackClick, layoutController }: IncomingMsgProps) => import("react/jsx-runtime").JSX.Element>;
export default IncomingMsg;
