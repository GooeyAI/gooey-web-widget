import clsx from "clsx";
import { memo, useRef } from "react";
import { addInlineStyle } from "src/addStyles";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconCheck from "src/assets/SvgIcons/IconCheck";
import IconBug from "src/assets/SvgIcons/IconBug";
import IconRefresh from "src/assets/SvgIcons/IconRefresh";
import Button from "src/components/shared/Buttons/Button";
import IconButton from "src/components/shared/Buttons/IconButton";
import GooeyTextResponse from "src/components/shared/Response";
import { hasResponseText } from "src/components/shared/Response/responseParser";
import ToolCalls from "src/components/shared/ToolCalls";
import GooeyTooltip from "src/components/shared/Tooltip";
import { useMessagesContext } from "src/contexts/hooks";
import { useCopyFeedback } from "src/components/shared/useCopyFeedback";
import { MESSAGE_GUTTER } from "../constants";
import ResponseLoader from "../Loader";
import {
  copyRenderedMessageToClipboard,
  getFeedbackButtonIcon as getFeedbackButtonIconWithTooltip,
} from "./helpers";
import style from "./incoming.scss?inline";
import type { LocationModalRef } from "./LocationModal";
import LocationModal from "./LocationModal";
import { SourcesSection } from "./Sources";

addInlineStyle(style);

type ReplyButton = {
  id: string;
  title: string;
  isPressed?: boolean;
};

const FeedbackButtons = ({
  data,
  showRunLink,
  messageId,
}: {
  data: {
    buttons: ReplyButton[];
    bot_message_id: string;
    web_url?: string;
  };
  showRunLink: boolean;
  messageId: string;
}) => {
  const { buttons, bot_message_id } = data;
  const locationModalRef = useRef<LocationModalRef | null>(null);
  const { initializeQuery, rerun } = useMessagesContext();
  const { copied, signalCopied } = useCopyFeedback();

  if (!buttons) return null;

  // Separate thumb buttons from normal buttons
  const thumbButtons: ReplyButton[] = [];
  const normalButtons: ReplyButton[] = [];
  // Check if any button has 'send_location' in its id
  let hasSendLocationButton = false;

  buttons.forEach((button) => {
    if (
      button.id.includes("thumb") ||
      getFeedbackButtonIconWithTooltip(button.id, button.isPressed || false)
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
    <div className="mw-100">
      {normalButtons.length > 0 && (
        <div className="gooey-feedback-buttons d-flex flex-col sm-flex-row gmt-12">
          {normalButtons.map(
            (button) =>
              button && (
                <FeedbackButton
                  key={button.id}
                  button={button}
                  className={clsx("my-1 mx-md-2 font_14_600")}
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
      )}
      {(thumbButtons.length > 0 || showRunLink) && (
        <div className="gooey-feedback-actions d-flex gmt-2 justify-content-start">
          {/* Copy Text Message to clipboard */}
          <GooeyTooltip
            text={copied ? "Copied" : "Copy Message"}
            forceShow={copied}
          >
            <IconButton
              onClick={async (e) => {
                await copyRenderedMessageToClipboard({
                  currentTarget: e.currentTarget,
                  messageId,
                });
                signalCopied();
              }}
              className="text-muted d-flex justify-content-center align-items-center h-100"
            >
              {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
            </IconButton>
          </GooeyTooltip>
          {thumbButtons &&
            thumbButtons.map(
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
          {showRunLink && data?.web_url && (
            <a href={data?.web_url} target="_blank" rel="noopener noreferrer">
              <IconButton className="text-muted d-flex justify-content-center align-items-center h-100">
                <IconBug size={12} />
              </IconButton>
            </a>
          )}
          {rerun && data?.web_url && (
            <GooeyTooltip text="Re-run">
              <IconButton
                onClick={() => rerun(data?.web_url!)}
                className="text-muted d-flex justify-content-center align-items-center h-100"
              >
                <IconRefresh size={12} />
              </IconButton>
            </GooeyTooltip>
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
  const icon = getFeedbackButtonIconWithTooltip(
    button.id,
    button.isPressed || false,
  );

  if (icon) {
    return (
      <GooeyTooltip
        text={
          button.id === "FEEDBACK_THUMBS_UP" ? "Good Response" : "Bad Response"
        }
      >
        <div className={clsx("gooey-feedback-button", "my-auto", className)}>
          <Button
            key={button.id}
            className="text-muted d-flex justify-content-center align-items-center h-100"
            onClick={onClick}
          >
            {icon}
          </Button>
        </div>
      </GooeyTooltip>
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
    showRunLink: boolean;
    showToolCalls: boolean;
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
    const hasText = hasResponseText(props.data);

    if (
      !props.data ||
      type === STREAM_MESSAGE_TYPES.CONVERSATION_START ||
      type === STREAM_MESSAGE_TYPES.RUN_START
    ) {
      return <ResponseLoader show={true} />;
    }

    return (
      <div className="gooey-incomingMsg gpb-12 mw-100">
        <div
          className={clsx(
            `gpl-${MESSAGE_GUTTER} gpr-${MESSAGE_GUTTER}`,
            "gooey-incoming-content mw-100",
          )}
        >
          {props?.data?.final_prompt && props?.showToolCalls && (
            <ToolCalls final_prompt={props?.data?.final_prompt} />
          )}
          {/* Bubble chrome only once there is text — an empty response must not
              paint an empty bubble in themes that style it. */}
          <div className={clsx(hasText && "gooey-incoming-bubble")}>
            <GooeyTextResponse
              data={props.data}
              linkColor={props?.linkColor}
              showSources={props?.showSources}
              isStreaming={isStreaming}
              id={props?.id}
            />
          </div>
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
                className="gooey-incoming-video"
                autoPlay={isAutoPlay}
                playsInline={true}
                controls
                src={videoTrack}
              ></video>
            </div>
          )}
          {!isStreaming && props?.data?.buttons && (
            <FeedbackButtons
              data={props?.data}
              showRunLink={props.showRunLink}
              messageId={props.id}
            />
          )}
        </div>
        {props.showSources && references && !!references?.length && (
          <SourcesSection {...props.data} />
        )}
      </div>
    );
  },
);

export default IncomingMsg;
