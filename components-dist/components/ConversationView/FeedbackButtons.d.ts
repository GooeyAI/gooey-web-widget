type ReplyButton = {
    id: string;
    title: string;
    isPressed?: boolean;
};
type FeedbackButtonsProps = {
    data: {
        buttons: ReplyButton[];
        bot_message_id: string;
    };
    onFeedbackClick: (button: ReplyButton) => void;
};
export declare const FeedbackButtons: ({ data, onFeedbackClick }: FeedbackButtonsProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
