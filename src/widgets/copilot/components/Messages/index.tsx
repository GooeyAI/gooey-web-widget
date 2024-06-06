import clsx from "clsx";
import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import PlaceholderMessage from "./PlaceholderMessage";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";

const Responses = (props: any) => {
  const { config } = useSystemContext();
  const que = props.queue;
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
            showSources={config?.showSources}
            linkColor={config?.branding?.colors?.primary}
          />
        );
      })}
    </>
  );
};

const Messages = () => {
  const { messages, isSending, scrollContainerRef }: any = useMessagesContext();

  const isEmpty = !messages?.size && !isSending;
  return (
    <div
      ref={scrollContainerRef}
      className={clsx(
        "flex-1 bg-white gpt-16 gpb-16 gpr-16 gpb-16 br-large-right d-flex flex-col",
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
