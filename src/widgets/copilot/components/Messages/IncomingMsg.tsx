import { useSystemContext } from "src/contexts/hooks";
import Sources from "./Sources";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import ResponseLoader from "../Loader";

import { addInlineStyle } from "src/addStyles";
import style from "./incoming.scss?inline";
import {
  formatTextResponse,
  getFeedbackButtonIcon,
  sanitizeReferences,
} from "./helpers";
import clsx from "clsx";
import Button from "src/components/shared/Buttons/Button";
import { memo } from "react";
addInlineStyle(style);

export const BotMessageLayout = (props: any) => {
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
      <p className="font_16_600">{branding?.name}</p>
      {!!props?.message && (
        <FeedbackButtons
          data={props?.message}
          onFeedbackClick={props?.onFeedbackClick}
        />
      )}
    </div>
  );
};

const FeedbackButtons = ({ data, onFeedbackClick }: any) => {
  const { buttons, bot_message_id } = data;
  if (!buttons) return null;
  return (
    <div className="d-flex gml-12">
      {buttons.map(
        (button: any) =>
          !!button && (
            <Button
              key={button.id}
              className="gmr-4 text-muted"
              variant="text"
              onClick={() =>
                !button.isPressed &&
                onFeedbackClick(button.id, bot_message_id)
              }
            >
              {getFeedbackButtonIcon(button.id, button.isPressed)}
            </Button>
          )
      )}
    </div>
  );
};

const IncomingMsg = memo((props: any) => {
  const { output_audio = [], type } = props.data;
  const audioTrack = output_audio[0];
  const isStreaming = type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE;
  const parsedElements = formatTextResponse(props.data, props?.linkColor);
  if (!parsedElements) return <ResponseLoader show={true} />;
  return (
    <div className="gooey-incomingMsg gpb-12">
      {props?.showSources && props?.data?.references && (
        <Sources data={sanitizeReferences(props?.data) || []} />
      )}
      <div className="gpl-16">
        <BotMessageLayout
          message={props?.data}
          onFeedbackClick={props?.onFeedbackClick}
        />
        <div
          className={clsx(
            "gml-36 gmt-4 font_16_400 pos-relative gooey-output-text markdown text-reveal-container",
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
      </div>
    </div>
  );
});

export default IncomingMsg;
