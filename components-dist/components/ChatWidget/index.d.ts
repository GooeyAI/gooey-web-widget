import { OnSendCallbackType } from '../../widgets/copilot/components/ChatInput';
import { default as React, ReactNode } from 'react';

export interface GWChatWidgetProps {
    messages: Array<{
        id?: string;
        bot_message_id?: string;
        [key: string]: any;
    }>;
    isSending: boolean;
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    config: {
        [key: string]: any;
    };
    onSend: OnSendCallbackType;
    onCancelSend: () => void;
    onNewConversation: () => void;
}
declare const GWChatWidget: React.FC<GWChatWidgetProps>;
export declare const useSecondaryDrawerController: ({ isMobile, shadowRoot, }: {
    isMobile?: boolean;
    shadowRoot?: ShadowRoot | null;
}) => {
    isSecondaryDrawerOpen: boolean;
    secondaryDrawerContent: () => ReactNode;
    toggleSecondaryDrawer: (content: (() => ReactNode) | null) => void;
};
export default GWChatWidget;
