import clsx from "clsx";
import { useMemo } from "react";
import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import SpinLoader from "src/components/shared/SpinLoader";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import { addInlineStyle } from "src/addStyles";
import messagesStyle from "./messages.scss?inline";
import { useMessagesScroll } from "./useMessagesScroll";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";

addInlineStyle(messagesStyle);

const Responses = (props: any) => {
  const { config } = useSystemContext();
  const msgs = props.data;

  return props.queue?.map((id: string) => {
    const responseData = msgs.get(id);
    if (responseData.role === "user") {
      return (
        <OutgoingMsg
          key={id}
          id={id}
          created_at={responseData.created_at}
          input_prompt={responseData.input_prompt}
          input_audio={responseData.input_audio}
          input_images={responseData.input_images}
          button_pressed={responseData.button_pressed}
          input_location={responseData.input_location}
          input_documents={responseData.input_documents}
          web_url={responseData.web_url}
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
          showRunTime={config?.showRunTime || false}
          showToolCalls={config?.showToolCalls || false}
        />
      );
    }
  });
};

const Messages = () => {
  const { messages, isSending, isMessagesLoading, isReceiving } =
    useMessagesContext();

  const queue = useMemo(() => Array.from(messages?.keys() ?? []), [messages]);
  const lastUserIdx = useMemo(() => {
    for (let i = queue.length - 1; i >= 0; i--) {
      if (messages?.get(queue[i])?.role === "user") return i;
    }
    return -1;
  }, [queue, messages]);
  const beforeIds = lastUserIdx >= 0 ? queue.slice(0, lastUserIdx) : queue;
  const anchorIds = lastUserIdx >= 0 ? queue.slice(lastUserIdx) : [];
  const latestUserId = anchorIds[0] ?? null;

  const {
    scrollContainerRef,
    anchorRef,
    showScrollToBottom,
    scrollToBottom,
    handleScroll,
  } = useMessagesScroll({ messages, latestUserId, isMessagesLoading });

  if (isMessagesLoading) {
    return (
      <div className="d-flex h-100 w-100 align-center justify-center">
        <SpinLoader />
      </div>
    );
  }

  const data = messages ?? new Map();

  return (
    <div className="pos-relative d-flex flex-col flex-1 w-100 gooey-messages-root">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={clsx(
          "flex-1 bg-white gpt-16 overflow-y-auto w-100 gooey-messages-container",
        )}
      >
        <div className="mw-760 mx-auto">
          <Responses queue={beforeIds} data={data} />
        </div>
        {anchorIds.length > 0 ? (
          <div ref={anchorRef} className="mw-760 mx-auto gooey-anchor-pair">
            <Responses queue={anchorIds} data={data} />
            <ResponseLoader show={isSending} />
          </div>
        ) : (
          <div className="mw-760 mx-auto">
            <ResponseLoader show={isSending} />
          </div>
        )}
      </div>
      {showScrollToBottom && (
        <button
          type="button"
          className="gooey-scroll-to-bottom-btn"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          {isReceiving ? (
            <CircleBeat size={12} className="anim-blink" />
          ) : (
            <IconChevronDown size={16} />
          )}
        </button>
      )}
    </div>
  );
};

export default Messages;
