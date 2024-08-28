import clsx from "clsx";
import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import PlaceholderMessage from "./PlaceholderMessage";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { useMemo } from "react";
import SpinLoader from "src/components/shared/SpinLoader";

const Responses = (props: any) => {
  const { config } = useSystemContext();
  const { handleFeedbackClick }: any = useMessagesContext();
  const que = useMemo(() => props.queue, [props]);
  const msgs = props.data;

  if (!que) return null;
  return (
    <>
      {que.map((id: string) => {
        const responseData = msgs.get(id);
        const role = responseData.role;
        if (role === "user")
          return <OutgoingMsg data={responseData} key={id} />;
        return (
          <IncomingMsg
            data={responseData}
            key={id}
            id={id}
            showSources={config?.showSources || true}
            linkColor={config?.branding?.colors?.primary || 'initial'}
            onFeedbackClick={handleFeedbackClick}
            autoPlay={config?.autoPlayResponses}
          />
        );
      })}
    </>
  );
};

const Messages = () => {
  const { messages, isSending, scrollContainerRef, isMessagesLoading }: any = useMessagesContext();
  
  if(isMessagesLoading){
    return (
      <div className="d-flex h-100 w-100 align-center justify-center">
        <SpinLoader />
      </div>
    )
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
      {!messages?.size && !isSending && <PlaceholderMessage />}
      <Responses queue={Array.from(messages.keys())} data={messages} />
      <ResponseLoader show={isSending} />
    </div>
  );
};

export default Messages;
