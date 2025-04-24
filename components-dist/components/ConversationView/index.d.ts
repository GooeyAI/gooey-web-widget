import { CopilotConfigType } from '../../contexts/types';
import { OnSendCallbackType } from '../../widgets/copilot/components/ChatInput';

export type ConversationViewProps = {
    messages: Map<string, any>;
    isSending?: boolean;
    scrollContainerRef?: React.RefObject<HTMLDivElement> | null;
    isMessagesLoading?: boolean;
    avoidAutoplay?: () => void | null;
    preventAutoplay?: boolean;
    config?: CopilotConfigType;
    onSend?: OnSendCallbackType;
    layoutController?: {
        toggleSecondaryDrawer: (content: any) => void;
    };
};
declare const ConversationView: ({ messages, isSending, scrollContainerRef, isMessagesLoading, avoidAutoplay, preventAutoplay, config, onSend, layoutController, }: ConversationViewProps) => import("react/jsx-runtime").JSX.Element;
export default ConversationView;
