import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import ResponseLoader from "../Loader";

import { addInlineStyle } from "src/addStyles";
import style from "./incoming.scss?inline";
import { formatTextResponse, getFeedbackButtonIcon } from "./helpers";
import clsx from "clsx";
import Button from "src/components/shared/Buttons/Button";
import { memo } from "react";
import { SourcesSection } from "./Sources";
addInlineStyle(style);

export const BotMessageLayout = (props: Record<string, any>) => {
  const branding = useSystemContext().config?.branding;
  return (
    <div className="d-flex align-start">
      {branding?.photoUrl && (
        <div
          className="bot-avatar bg-primary gmr-12"
          style={{ width: "24px", height: "24px", borderRadius: "100%" }}
        >
          <img
            src={branding?.photoUrl}
            alt="bot-avatar"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div className="gmt-2 mw-100 overflow-hidden">{props.children}</div>
    </div>
  );
};

type ReplyButton = {
  id: string;
  title: string;
  isPressed?: boolean;
};

const FeedbackButtons = ({
  data,
}: {
  data: {
    buttons: ReplyButton[];
    bot_message_id: string;
  };
}) => {
  const { buttons, bot_message_id } = data;
  const { initializeQuery }: any = useMessagesContext();
  if (!buttons) return null;
  const children = buttons
    .map(
      (button) =>
        button && (
          <FeedbackButton
            key={button.id}
            button={button}
            onClick={() => {
              if (button.isPressed) return;
              initializeQuery({
                button_pressed: {
                  button_id: button.id,
                  button_title: button.title,
                  context_msg_id: bot_message_id,
                },
              });
            }}
          />
        )
    )
    .filter(Boolean);
  return <div className="d-flex gml-36">{children}</div>;
};

const FeedbackButton = ({
  button,
  onClick,
}: {
  button: ReplyButton;
  onClick: () => void;
}) => {
  let icon = getFeedbackButtonIcon(button.id, button.isPressed || false);
  if (icon) {
    return (
      <Button
        key={button.id}
        className="gmr-4 text-muted"
        variant="text"
        onClick={onClick}
      >
        {icon}
      </Button>
    );
  } else {
    return (
      <Button
        key={button.id}
        className="gmr-4"
        variant="text"
        onClick={onClick}
        hideOverflow={false}
      >
        {button.title}
      </Button>
    );
  }
};

const IncomingMsg = memo(
  (props: {
    data: any;
    id: string;
    showSources: boolean;
    linkColor: string;
    autoPlay: boolean | undefined;
  }) => {
    const {
      output_audio = [],
      type,
      output_video = [],
      references = [],
    } = props.data;
    const isAutoPlay = props.autoPlay === false ? false : true;
    const audioTrack = output_audio[0];
    const videoTrack = output_video[0];
    const isStreaming = type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE;

    // Parse the response text and format it - customised links, sources, etc.
    const parsedElements = formatTextResponse(
      props.data,
      props?.linkColor,
      props?.showSources
    );

    if (!parsedElements) return <ResponseLoader show={true} />;
    return (
      <div className="gooey-incomingMsg gpb-12 mw-100">
        <div className="gpl-16 mw-100">
          <BotMessageLayout>
            <div
              className={clsx(
                "font_16_400 pos-relative gooey-output-text markdown text-reveal-container mw-100",
                isStreaming && "response-streaming"
              )}
              id={props?.id}
            >
              {parsedElements}
            </div>
          </BotMessageLayout>
          {!isStreaming && !videoTrack && audioTrack && (
            <div className="gmt-8 gml-36 mw-100">
              <audio
                autoPlay={isAutoPlay}
                playsInline={true}
                controls
                src={audioTrack}
              ></audio>
            </div>
          )}
          {!isStreaming && videoTrack && (
            <div className="gmt-16 gml-36">
              <video
                autoPlay={isAutoPlay}
                playsInline={true}
                controls
                src={videoTrack}
                style={{ backgroundColor: "#000" }}
              ></video>
            </div>
          )}
          {!isStreaming && props?.data?.buttons && (
            <FeedbackButtons data={props?.data} />
          )}
        </div>
        {props.showSources && !!references.length && (
          <SourcesSection {...props.data} />
        )}
      </div>
    );
  }
);

export default IncomingMsg;
