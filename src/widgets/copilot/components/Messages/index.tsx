import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { useMemo } from "react";
import { useScrollManager } from "src/contexts/messages/useScrollManager";
import SpinLoader from "src/components/shared/SpinLoader";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconButton from "src/components/shared/Buttons/IconButton";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import { addInlineStyle } from "src/addStyles";
import messagesStyle from "./messages.scss?inline";
addInlineStyle(messagesStyle);

export const MESSAGE_GUTTER = 8;
const Responses = ({
  queue,
  data,
}: {
  queue: string[];
  data: Map<string, any>;
}) => {
  const { config } = useSystemContext();
  let latestUserMessageIndex = -1;
  for (let i = queue.length - 1; i >= 0; i--) {
    if (data.get(queue[i])?.role === "user") {
      latestUserMessageIndex = i;
      break;
    }
  }

  return queue?.map((id: string, index: number) => {
    const responseData = data.get(id);
    if (!responseData) return null;
    if (responseData.role === "user") {
      return (
        <OutgoingMsg
          key={id}
          input_prompt={responseData.input_prompt}
          input_audio={responseData.input_audio}
          input_images={responseData.input_images}
          button_pressed={responseData.button_pressed}
          input_location={responseData.input_location}
          input_documents={responseData.input_documents}
          isLatestUserMessage={index === latestUserMessageIndex}
        />
      );
    } else {
      return (
        <IncomingMsg
          data={responseData}
          key={id}
          id={id}
          showSources={config?.showSources || false}
          linkColor={config?.branding?.colors?.primary || "initial"}
          autoPlay={config?.autoPlayResponses}
          showRunLink={config?.showRunLink || false}
          showToolCalls={config?.showToolCalls || false}
        />
      );
    }
  });
};

const Messages = () => {
  const {
    messages,
    isSending,
    isMessagesLoading,
    isReceiving,
  } = useMessagesContext();

  const {
    scrollContainerRef,
    showScrollToBottom,
    scrollToBottom,
    handleScrollContainerScroll,
  } = useScrollManager(isMessagesLoading ?? false);

  const queue = useMemo(() => Array.from(messages?.keys() ?? []), [messages]);

  if (isMessagesLoading) {
    return (
      <div className="d-flex h-100 w-100 align-center justify-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="gooey-messages-overlay-wrapper pos-relative flex-1 d-flex flex-col w-100">
      <div
        ref={scrollContainerRef}
        onScroll={handleScrollContainerScroll}
        className="flex-1 bg-white gpt-16 overflow-y-auto w-100 gooey-messages-container"
      >
        <div
          className="mw-760 d-flex flex-col"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Responses queue={queue} data={messages ?? new Map()} />
          <ResponseLoader show={isSending} />
          <div className="gooey-scroll-spacer" aria-hidden="true" />
        </div>
      </div>
      {showScrollToBottom && (
        <IconButton
          className="gooey-scroll-to-bottom-btn pos-absolute br-circle bg-white b-1 bx-shadowA justify-center"
          onClick={() => scrollToBottom?.()}
          aria-label="Scroll to bottom"
          variant="text"
        >
          {isReceiving ? (
            <CircleBeat className="anim-blink" size={12} />
          ) : (
            <IconChevronDown size={16} />
          )}
        </IconButton>
      )}
    </div>
  );
};

export default Messages;
