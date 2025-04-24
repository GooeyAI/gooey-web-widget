import ConversationView from "src/components/ConversationView";
import ChatInput from "../ChatInput";
import { FC } from "react";
import AppLayout from "src/components/shared/Layout/AppLayout";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { CopilotConfigType } from "src/contexts/types";

type CopilotWidgetType = {
  isInline?: boolean;
};

const CopilotWidget: FC<CopilotWidgetType> = ({ isInline }) => {
  const {
    messages,
    isSending,
    scrollContainerRef,
    isMessagesLoading,
    avoidAutoplay,
    preventAutoplay,
    initializeQuery,
    isReceiving,
    cancelApiCall
  }: any = useMessagesContext();
  const { config } = useSystemContext() as { config: CopilotConfigType };

  return (
    <AppLayout isInline={isInline}>
      <ConversationView
        messages={messages}
        isSending={isSending}
        scrollContainerRef={scrollContainerRef}
        isMessagesLoading={isMessagesLoading}
        avoidAutoplay={avoidAutoplay}
        preventAutoplay={preventAutoplay}
        config={config}
        onSend={(payload) => initializeQuery(payload)}
      />
      <ChatInput
        config={config}
        isSending={isSending}
        isReceiving={isReceiving}
        onSend={(payload) => initializeQuery(payload)}
        onCancelSend={cancelApiCall}
      />
    </AppLayout>
  );
};
export default CopilotWidget;
