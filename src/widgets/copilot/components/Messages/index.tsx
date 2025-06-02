import clsx from "clsx";
import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { useEffect, useMemo } from "react";
import SpinLoader from "src/components/shared/SpinLoader";

const Responses = (props: any) => {
  const { config } = useSystemContext();
  const { preventAutoplay } = useMessagesContext();
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
          autoPlay={preventAutoplay ? false : config?.autoPlayResponses}
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
    avoidAutoplay,
  } = useMessagesContext();
  useEffect(() => {
    // avoid autoplay on mount
    avoidAutoplay?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        "flex-1 bg-white gpt-16 overflow-y-auto w-100",
        isEmpty ? "justify-end" : "justify-start",
      )}
    >
      <div className="mw-760 d-flex flex-col">
        <Responses
          queue={Array.from(messages?.keys() ?? [])}
          data={messages ?? new Map()}
        />
      <ResponseLoader show={isSending} />
      </div>
    </div>
  );
};

export default Messages;
