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
  formatMessageTime,
  formatRunTime,
  getFeedbackButtonIcon as getFeedbackButtonIconWithTooltip,
} from "./helpers";
import style from "./incoming.scss?inline";
import type { LocationModalRef } from "./LocationModal";
import LocationModal from "./LocationModal";
import { SourcesSection } from "./Sources";
import { MetaLabel, StreamTimerLabel, useStreamTimer } from "./StreamTimer";

addInlineStyle(style);

type ReplyButton = {
  id: string;
  title: string;
  isPressed?: boolean;
};

/**
 * The strip under a response. It holds the live timer while the response is
 * streaming and the actions once it has finished, so both land in the same
 * place and the row does not jump when the stream ends.
 */
const ActionRow = ({ children }: { children: React.ReactNode }) => (
  <div className="gooey-feedback-actions d-flex align-center gmt-2 justify-content-start">
    {children}
  </div>
);

const IncomingMsgActions = ({
  data,
  showRunLink,
  messageId,
  hasText,
  hasContent,
  measuredSec,
}: {
  data: {
    buttons?: ReplyButton[];
    bot_message_id: string;
    web_url?: string;
    created_at?: string;
    run_time_sec?: number;
    run_time?: number;
  };
  showRunLink: boolean;
  messageId: string;
  hasText: boolean;
  hasContent: boolean;
  measuredSec: number | null;
}) => {
  const { buttons = [], bot_message_id } = data;
  const locationModalRef = useRef<LocationModalRef | null>(null);
  const { initializeQuery, rerun } = useMessagesContext();
  const { copied, signalCopied } = useCopyFeedback();

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

  const timeStr = formatMessageTime(data?.created_at);
  // Whoever actually knows wins: `run_time_sec` is what the stream's final
  // response carries, a bare `run_time` is accepted too so a host controller
  // can use the name its own payloads use, and the browser's own measurement
  // is the last resort for a response that streamed without either.
  const runTimeStr = formatRunTime(
    data?.run_time_sec ?? data?.run_time ?? measuredSec,
  );
  const metaStr = [timeStr, runTimeStr].filter(Boolean).join(" · ");
  // Copy puts the rendered message body on the clipboard, so it needs a body.
  const showCopy = hasText;
  const showDebugLink = showRunLink && Boolean(data?.web_url);
  const showRerun = Boolean(rerun) && Boolean(data?.web_url);
  // The action row stands on its own: thumbs are optional extras the backend
  // adds, not the reason the row exists. An empty response is the exception —
  // it paints no bubble, so a lone timestamp would float in the gutter.
  const showActions =
    hasContent &&
    (Boolean(metaStr) ||
      showCopy ||
      thumbButtons.length > 0 ||
      showDebugLink ||
      showRerun);

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
      {showActions && (
        <ActionRow>
          {/* Copy Text Message to clipboard */}
          {showCopy && (
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
          )}
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
          {showDebugLink && (
            <a href={data?.web_url} target="_blank" rel="noopener noreferrer">
              <IconButton className="text-muted d-flex justify-content-center align-items-center h-100">
                <IconBug size={12} />
              </IconButton>
            </a>
          )}
          {showRerun && (
            <GooeyTooltip text="Re-run">
              <IconButton
                onClick={() => rerun?.(data?.web_url!)}
                className="text-muted d-flex justify-content-center align-items-center h-100"
              >
                <IconRefresh size={12} />
              </IconButton>
            </GooeyTooltip>
          )}
          <MetaLabel className="gml-4">{metaStr}</MetaLabel>
        </ActionRow>
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
    const { startedAt, measuredSec } = useStreamTimer(isStreaming);

    // Nothing has arrived yet: the timer keeps the blinking dot company so the
    // wait is legible before there is any text to put a row under.
    if (
      !props.data ||
      type === STREAM_MESSAGE_TYPES.CONVERSATION_START ||
      type === STREAM_MESSAGE_TYPES.RUN_START
    ) {
      return (
        <div className="d-flex align-center">
          <ResponseLoader show={true} />
          {startedAt !== null && (
            <StreamTimerLabel startedAt={startedAt} className="gml-8" />
          )}
        </div>
      );
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
          {/* While streaming, the row carries the timer alone; once the
              response is final it carries the actions. Copy and the timestamp
              do not depend on the backend sending any reply buttons, so the
              row is not gated on them. */}
          {isStreaming ? (
            startedAt !== null && (
              <ActionRow>
                <StreamTimerLabel startedAt={startedAt} />
              </ActionRow>
            )
          ) : (
            <IncomingMsgActions
              data={props?.data}
              showRunLink={props.showRunLink}
              messageId={props.id}
              hasText={hasText}
              hasContent={hasText || Boolean(audioTrack) || Boolean(videoTrack)}
              measuredSec={measuredSec}
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
