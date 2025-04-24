import clsx from "clsx";
import { useEffect } from "react";
import PlaceholderMessage from "./PlaceholderMessage";
import ResponseLoader from "../../widgets/copilot/components/Loader";
import SpinLoader from "src/components/shared/SpinLoader";
import MessagesList from "./Responses";
import { CopilotConfigType } from "src/contexts/types";
import { OnSendCallbackType } from "src/widgets/copilot/components/ChatInput";

export type ConversationViewProps = {
  messages: Map<string, any>;
  isSending?: boolean;
  scrollContainerRef?: React.RefObject<HTMLDivElement> | null;
  isMessagesLoading?: boolean;
  avoidAutoplay?: () => void | null;
  preventAutoplay?: boolean;
  config?: CopilotConfigType;
  onSend?: OnSendCallbackType
  layoutController?: {
    toggleSecondaryDrawer: (content: any) => void;
  };
};

const ConversationView = ({
  messages,
  isSending = false,
  scrollContainerRef,
  isMessagesLoading,
  avoidAutoplay = () => null,
  preventAutoplay = true,
  config,
  onSend,
  layoutController,
}: ConversationViewProps) => {
  useEffect(() => {
    avoidAutoplay();
  }, [avoidAutoplay]);

  if (isMessagesLoading) {
    return (
      <div className="d-flex h-100 w-100 align-center justify-center">
        <SpinLoader />
      </div>
    );
  }

  const isEmpty = !messages?.size && !isSending;

  return (
    <div
      ref={scrollContainerRef}
      className={clsx(
        "flex-1 bg-white gpt-16 gpb-16 gpr-16 gpb-16 d-flex flex-col",
        isEmpty ? "justify-end" : "justify-start"
      )}
      style={{ overflowY: "auto" }}
    >
      {isEmpty && (
        <PlaceholderMessage
          initializeQuery={onSend || (() => null)}
          config={config as CopilotConfigType}
        />
      )}
      <MessagesList
        queue={Array.from(messages.keys())}
        data={messages}
        preventAutoplay={preventAutoplay}
        config={config as CopilotConfigType}
        layoutController={layoutController}
      />
      <ResponseLoader show={isSending} photoUrl={config?.branding?.photoUrl} />
    </div>
  );
};

export default ConversationView;