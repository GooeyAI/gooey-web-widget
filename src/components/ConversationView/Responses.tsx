import IncomingMsg from "./IncomingMsg";
import OutgoingMsg from "./OutgoingMsg";

export type MessagesListProps = {
  queue: string[];
  data: Map<string, any>;
  preventAutoplay: boolean;
  initializeQuery?: (data: any) => void;
  config: {
    showSources?: boolean;
    autoPlayResponses?: boolean;
    branding?: {
      colors?: {
        primary?: string;
      };
      photoUrl?: string;
    };
  };
  layoutController?: {
    toggleSecondaryDrawer: (content: any) => void;
  };
};

const MessagesList = ({
  queue,
  data,
  preventAutoplay,
  config,
  initializeQuery: initializeQuery = () => {},
  layoutController,
}: MessagesListProps) => {
  if (!queue) return null;
  return (
    <>
      {queue.map((id) => {
        const responseData = data.get(id);
        if (!responseData) return null;
        console.log(responseData, ">>11");
        const role = responseData.role;
        if (role === "user") {
          return (
            <OutgoingMsg
              input_prompt={responseData.input_prompt}
              input_audio={responseData.input_audio}
              input_images={responseData.input_images}
              button_pressed={responseData.button_pressed}
            />
          );
        }

        return (
          <IncomingMsg
            layoutController={layoutController}
            data={responseData}
            id={id}
            showSources={config?.showSources || false}
            linkColor={config?.branding?.colors?.primary || "#000"}
            autoPlay={preventAutoplay ? false : config?.autoPlayResponses}
            photoUrl={config?.branding?.photoUrl}
            onFeedbackClick={({ id, title }) =>
              initializeQuery({
                button_pressed: {
                  button_id: id,
                  button_title: title,
                  context_msg_id: responseData.bot_message_id,
                },
              })
            }
          />
        );
      })}
    </>
  );
};

export default MessagesList;
