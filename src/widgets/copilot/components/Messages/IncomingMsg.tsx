import clsx from "clsx";
import { memo, useRef } from "react";
import { addInlineStyle } from "src/addStyles";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import Button from "src/components/shared/Buttons/Button";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import ResponseLoader from "../Loader";
import { getFeedbackButtonIcon } from "./helpers";
import style from "./incoming.scss?inline";
import LocationModal from "./LocationModal";
import { SourcesSection } from "./Sources";
import type { LocationModalRef } from "./LocationModal";
import { MESSAGE_GUTTER } from ".";
import GooeyTextResponse from "src/components/shared/Response";
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
  const locationModalRef = useRef<LocationModalRef | null>(null);
  const { initializeQuery } = useMessagesContext();

  if (!buttons) return null;

  // Separate thumb buttons from normal buttons
  const thumbButtons: ReplyButton[] = [];
  const normalButtons: ReplyButton[] = [];
  // Check if any button has 'send_location' in its id
  let hasSendLocationButton = false;

  buttons.forEach((button) => {
    if (
      button.id.includes("thumb") ||
      getFeedbackButtonIcon(button.id, button.isPressed || false)
    ) {
      thumbButtons.push(button);
    } else {
      normalButtons.push(button);
    }
    if (button.id.includes("send_location")) {
      hasSendLocationButton = true;
    }
  });

  return (
    <div>
      {normalButtons.length > 0 && (
        <div className="gooey-scroll-wrapper">
          <div
            className="d-flex flex-col sm-flex-row gooey-scroll-container"
            style={{ gap: "12px" }}
          >
            {normalButtons.map(
              (button) =>
                button && (
                  <FeedbackButton
                    key={button.id}
                    button={button}
                    className={clsx("my-1 mx-md-2 w-100")}
                    onClick={() => {
                      if (button.isPressed) return;
                      if (button.id.includes("send_location")) {
                        locationModalRef.current?.open();
                      } else {
                        // Follow up button press
                        initializeQuery?.({
                          button_pressed: {
                            button_id: button.id,
                            button_title: button.title,
                            context_msg_id: bot_message_id,
                          },
                        });
                      }
                    }}
                  />
                ),
            )}
          </div>
        </div>
      )}
      {thumbButtons.length > 0 && (
        <div
          className="d-flex gmt-2 justify-content-start"
          style={{ gap: "4px" }}
        >
          {thumbButtons.map(
            (button) =>
              button && (
                <FeedbackButton
                  key={button.id}
                  button={button}
                  onClick={() => {
                    if (button.isPressed) return;
                    initializeQuery?.({
                      button_pressed: {
                        button_id: button.id,
                        button_title: button.title,
                        context_msg_id: bot_message_id,
                      },
                    });
                  }}
                />
              ),
          )}
        </div>
      )}
      {hasSendLocationButton && (
        <LocationModal
          ref={locationModalRef}
          onSendLocation={(location) => {
            initializeQuery?.({
              input_location: location,
            });
          }}
        />
      )}
    </div>
  );
};

const FeedbackButton = ({
  button,
  onClick,
  className,
}: {
  button: ReplyButton;
  onClick: () => void;
  className?: string;
}) => {
  const icon = getFeedbackButtonIcon(button.id, button.isPressed || false);

  if (icon) {
    return (
      <div className={clsx("my-auto", className)}>
        <Button key={button.id} className="text-muted" onClick={onClick}>
          {icon}
        </Button>
      </div>
    );
  }

  let title = button.title;
  if (!title && button?.id?.includes("send_location")) {
    title = " 📍 Share Location";
  }

  return (
    <Button
      key={button.id}
      className={clsx("text-left", className)}
      variant="outlined"
      onClick={onClick}
      hideOverflow={false}
    >
      {title}
    </Button>
  );
};

const IncomingMsg = memo(
  (props: {
    data: any;
    id: string;
    showSources: boolean;
    linkColor: string;
    autoPlay: boolean | undefined;
    responseBodyTextModification?: (body: string) => string;
  }) => {
    const {
      output_audio = [],
      type,
      output_video = [],
      references = [],
    } = props.data;
    const { latestMessageIds } = useMessagesContext();
    const isNewlyReceived = latestMessageIds?.has(props.id);
    const isAutoPlay = props.autoPlay === false ? false : isNewlyReceived;
    const audioTrack = output_audio[0];
    const videoTrack = output_video[0];
    const isStreaming = type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE;

    if (!props.data) return <ResponseLoader show={true} />;
    return (
      <div className="gooey-incomingMsg gpb-12 mw-100">
        <div
          className={clsx(
            `gpl-${MESSAGE_GUTTER} gpr-${MESSAGE_GUTTER}`,
            "mw-100",
          )}
        >
          <GooeyTextResponse
            data={props.data}
            linkColor={props?.linkColor}
            showSources={props?.showSources}
            isStreaming={isStreaming}
            id={props?.id}
            responseBodyTextModification={props?.responseBodyTextModification}
          />
          {!isStreaming && !videoTrack && audioTrack && (
            <div className="gmt-8 gmb-8 mw-100">
              <audio
                autoPlay={isAutoPlay}
                playsInline={true}
                controls
                src={audioTrack}
              ></audio>
            </div>
          )}
          {!isStreaming && videoTrack && (
            <div className="gmt-16 gmb-8">
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
  },
);

export default IncomingMsg;
