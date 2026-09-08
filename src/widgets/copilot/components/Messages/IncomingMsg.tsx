import clsx from "clsx";
import { memo, useRef, useState } from "react";
import { addInlineStyle } from "src/addStyles";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconCheck from "src/assets/SvgIcons/IconCheck";
import IconBug from "src/assets/SvgIcons/IconBug";
import IconRefresh from "src/assets/SvgIcons/IconRefresh";
import Button from "src/components/shared/Buttons/Button";
import IconButton from "src/components/shared/Buttons/IconButton";
import GooeyDialog from "src/components/shared/Dialog";
import { themeCapabilities } from "src/themes";
import GooeyTextResponse from "src/components/shared/Response";
import { hasResponseText } from "src/components/shared/Response/responseParser";
import ToolCalls from "src/components/shared/ToolCalls";
import GooeyTooltip from "src/components/shared/Tooltip";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
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
  description?: string;
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
  const { config } = useSystemContext();

  if (!buttons) return null;

  const menuButtons = buttons.filter(
    (button) => !button.id.includes("send_location"),
  );
  const showOptionsMenu =
    themeCapabilities(config?.theme).optionsMenu && menuButtons.length > 2;

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
    } else if (!showOptionsMenu || button.id.includes("send_location")) {
      normalButtons.push(button);
    }
    if (button.id.includes("send_location")) {
      hasSendLocationButton = true;
    }
  });

  return (
    <div className="gooey-message-actions mw-100">
      {showOptionsMenu && (
        <OptionsMenu buttons={menuButtons} botMessageId={bot_message_id} />
      )}
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
          {!showOptionsMenu &&
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

const OptionsMenu = ({
  buttons,
  botMessageId,
}: {
  buttons: ReplyButton[];
  botMessageId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { initializeQuery, isSending, isReceiving } = useMessagesContext();

  return (
    <>
      <Button
        variant="outlined"
        className="gooey-options-trigger w-100 gmt-12"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="d-flex align-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="gmr-8"
          >
            <path
              d="M8 6h12M8 12h12M8 18h12M3 6h1M3 12h1M3 18h1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Options
        </span>
      </Button>
      <GooeyDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Options"
        maxWidth="xs"
        className="gooey-options-menu"
      >
        {buttons.map((button) => (
          <Button
            key={button.id}
            className="gooey-options-row w-100 text-left gpt-20 gpb-20 gpl-0 gpr-0"
            disabled={button.isPressed || isSending || isReceiving}
            onClick={() => {
              setOpen(false);
              initializeQuery?.({
                button_pressed: {
                  button_id: button.id,
                  button_title: button.title,
                  context_msg_id: botMessageId,
                },
              });
            }}
          >
            <span className="d-block font_16_400">{button.title}</span>
            {button.description && (
              <span className="d-block font_14_400 text-muted gmt-4">
                {button.description}
              </span>
            )}
          </Button>
        ))}
        <div className="gooey-options-hint text-center font_14_400 gpt-24 gpb-24">
          Tap an item to select it
        </div>
      </GooeyDialog>
    </>
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
