import clsx from "clsx";
import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { useMemo } from "react";
import SpinLoader from "src/components/shared/SpinLoader";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import { addInlineStyle } from "src/addStyles";
import messagesStyle from "./messages.scss?inline";
import { useMessagesScroll } from "./useMessagesScroll";

addInlineStyle(messagesStyle);

export const MESSAGE_GUTTER = 8;

const Responses = (props: any) => {
  const { config } = useSystemContext();
  const que = useMemo(() => props.queue, [props]);
  const msgs = props.data;
  const latestUserId = props.latestUserId;

  return que?.map((id: string) => {
    const responseData = msgs.get(id);
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
          isLatest={id === latestUserId}
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
  const { messages, isSending, isMessagesLoading } = useMessagesContext();
  const {
    scrollContainerRef,
    scrollContentRef,
    showScrollToBottom,
    scrollToBottom,
    handleScrollContainerScroll,
  } = useMessagesScroll({ messages, isMessagesLoading });

  const queue = useMemo(() => Array.from(messages?.keys() ?? []), [messages]);
  const latestUserId = useMemo(() => {
    if (!messages) return null;
    for (let i = queue.length - 1; i >= 0; i--) {
      if (messages.get(queue[i])?.role === "user") return queue[i];
    }
    return null;
  }, [queue, messages]);

  if (isMessagesLoading) {
    return (
      <div className="d-flex h-100 w-100 align-center justify-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="pos-relative d-flex flex-col flex-1 w-100 gooey-messages-root">
      <div
        ref={scrollContainerRef}
        onScroll={handleScrollContainerScroll}
        className={clsx(
          "flex-1 bg-white gpt-16 overflow-y-auto w-100 gooey-messages-container",
        )}
      >
        <div
          ref={scrollContentRef}
          className="mw-760 d-flex flex-col gooey-messages-content"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Responses
            queue={queue}
            data={messages ?? new Map()}
            latestUserId={latestUserId}
          />
          <ResponseLoader show={isSending} />
        </div>
      </div>
      {showScrollToBottom && (
        <button
          type="button"
          className="gooey-scroll-to-bottom-btn"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <IconChevronDown size={16} />
        </button>
      )}
    </div>
  );
};

export default Messages;
