export type MessagesListProps = {
    queue: string[];
    data: Map<string, any>;
    preventAutoplay: boolean;
    initializeQuery?: (data: any) => void;
    config: {
        showSources?: boolean;
        autoPlayResponses?: boolean;
        branding?: {
            colors?: {
                primary?: string;
            };
            photoUrl?: string;
        };
    };
    layoutController?: {
        toggleSecondaryDrawer: (content: any) => void;
    };
};
declare const MessagesList: ({ queue, data, preventAutoplay, config, initializeQuery: initializeQuery, layoutController, }: MessagesListProps) => import("react/jsx-runtime").JSX.Element | null;
export default MessagesList;
