import clsx from "clsx";
import ResponseLoader from "../Loader";
import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";
import PlaceholderMessage from "./PlaceholderMessage";
import { useMessagesContext } from "src/contexts/hooks";

const Responses = (props: any) => {
  const que = props.queue;
  const msgs = props.data;

  if (!que) return null;
  return (
    <>
      {que.map((id: string) => {
        const responseData = msgs.get(id);
        const role = responseData.role;

        if (role === "user")
          return (
            <OutgoingMsg
              data={responseData}
              key={id}
            />
          );
        return <IncomingMsg data={responseData} key={id} id={id} />;
      })}
    </>
  );
};

const Messages = () => {
  const { messages, isSending }: any = useMessagesContext();

  const isEmpty = !messages?.size && !isSending;
  return (
    <div
      className={clsx(
        "flex-1 bg-white overflow-scroll p-16 br-large-right d-flex flex-col overflow-x-hidden",
        isEmpty ? "justify-end" : "justify-start"
      )}
    >
      {!messages?.size && !isSending && <PlaceholderMessage />}
      <Responses queue={Array.from(messages.keys())} data={messages} />
      {/* {!!messages?.size && !isSending && <Suggestions />} */}
      <ResponseLoader show={isSending} />
    </div>
  );
};

export default Messages;
