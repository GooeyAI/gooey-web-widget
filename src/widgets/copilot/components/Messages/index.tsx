import clsx from "clsx";
import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { useMemo } from "react";
import SpinLoader from "src/components/shared/SpinLoader";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconButton from "src/components/shared/Buttons/IconButton";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import { addInlineStyle } from "src/addStyles";
import messagesStyle from "./messages.scss?inline";
addInlineStyle(messagesStyle);

export const MESSAGE_GUTTER = 8;
const Responses = (props: any) => {
  const { config } = useSystemContext();
  const que = useMemo(() => props.queue, [props]);
  const msgs = props.data;

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
    scrollContainerRef,
    isMessagesLoading,
    showScrollToBottom,
    scrollToBottom,
    handleScrollContainerScroll,
    isReceiving,
  } = useMessagesContext();

  if (isMessagesLoading) {
    return (
      <div className="d-flex h-100 w-100 align-center justify-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScrollContainerScroll}
      className={clsx(
        "flex-1 bg-white gpt-16 overflow-y-auto w-100 gooey-messages-container",
      )}
    >
      <div
        className="mw-760 d-flex flex-col"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <Responses
          queue={Array.from(messages?.keys() ?? [])}
          data={messages ?? new Map()}
        />
        <ResponseLoader show={isSending} />
        <div className="gooey-scroll-spacer" aria-hidden="true" />
      </div>
      <IconButton
        className={clsx(
          "gooey-scroll-to-bottom-btn mr-auto ml-auto pos-sticky br-circle bg-white b-1 bx-shadowA justify-center",
          showScrollToBottom ? "visible" : "invisible",
        )}
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
    </div>
  );
};

export default Messages;
