import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import Sources from "./Sources";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import ResponseLoader from "../Loader";

import { addInlineStyle } from "src/addStyles";
import style from "./incoming.scss?inline";
import { formatTextResponse, getFeedbackButtonIcon } from "./helpers";
import clsx from "clsx";
import Button from "src/components/shared/Buttons/Button";
addInlineStyle(style);

export const BotMessageLayout = () => {
  const branding = useSystemContext().config?.branding;
  return (
    <div className="d-flex align-center">
      {branding?.photoUrl && (
        <div
          className="bot-avatar bg-primary gmr-12"
          style={{ width: "24px", height: "24px", borderRadius: "100%" }}
        >
          <img
            src={branding?.photoUrl}
            alt="bot-avatar"
            style={{ width: "24px", height: "24px", borderRadius: "100%" }}
          />
        </div>
      )}
      <p className="font_14_600">{branding?.name}</p>
    </div>
  );
};

const IncomingMsg = (props: any) => {
  const { config } = useSystemContext();
  const { handleFeedbackClick }: any = useMessagesContext();
  const {
    references = [],
    output_audio = [],
    type,
    buttons,
    bot_message_id,
  } = props.data;
  const audioTrack = output_audio[0];
  const isStreaming = type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE;
  const parsedElements = formatTextResponse(props.data);
  if (!parsedElements) return <ResponseLoader show={true} />;
  return (
    <div className="gooey-incomingMsg gpb-12 gpr-8">
      {config?.showSources && <Sources data={references} />}
      <div className="gpl-16">
        <BotMessageLayout />
        <div
          className={clsx(
            "gml-36 gmt-4 font_16_400 pos-relative gooey-output-text markdown",
            isStreaming && "response-streaming"
          )}
          id={props?.id}
        >
          {parsedElements}
        </div>
        {audioTrack && (
          <div className="gmt-16">
            <audio controls src={audioTrack}></audio>
          </div>
        )}
        {!!buttons && (
          <div className="gml-36 d-flex">
            <div className="d-flex">
              {buttons.map(
                (button: any) =>
                  !!button && (
                    <Button
                      key={button.id}
                      className="gmr-4"
                      variant="text"
                      onClick={() =>
                        !button.isPressed &&
                        handleFeedbackClick(button.id, bot_message_id)
                      }
                    >
                      {getFeedbackButtonIcon(button.id, button.isPressed)}
                    </Button>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomingMsg;
