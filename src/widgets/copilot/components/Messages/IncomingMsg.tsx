import clsx from "clsx";
import { memo, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { addInlineStyle } from "src/addStyles";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import IconBug from "src/assets/SvgIcons/IconBug";
import Button from "src/components/shared/Buttons/Button";
import IconButton from "src/components/shared/Buttons/IconButton";
import GooeyTextResponse from "src/components/shared/Response";
import { hasResponseText } from "src/components/shared/Response/responseParser";
import ToolCalls, {
  UNCOUNTED_TOOL_NAMES,
  extractToolCallsFromFinalPrompt,
  getRunningToolsLabel,
} from "src/components/shared/ToolCalls";
import GooeyTooltip from "src/components/shared/Tooltip";
import { useMessagesContext } from "src/contexts/hooks";
import {
  isReplyStreaming,
  type FinalResponse,
} from "src/contexts/MessagesContext";
import { splitThinking } from "src/components/shared/thinking";
import { ACTION_ICON_SIZE, MESSAGE_GUTTER } from "../constants";
import CopyButton from "./CopyButton";
import StatusLine, { getStatusLabel } from "src/components/shared/StatusLine";
import ResponseLoader from "../Loader";
import {
  copyRenderedMessageToClipboard,
  formatRunTime,
  getFeedbackButtonIcon as getFeedbackButtonIconWithTooltip,
  isMobile,
} from "./helpers";
import style from "./incoming.scss?inline";
import type { LocationModalRef } from "./LocationModal";
import LocationModal from "./LocationModal";
import { SourcesSection } from "./Sources";
import { MessageTimeLabel } from "./MessageTime";
import { useStreamTimer } from "./StreamTimer";

addInlineStyle(style);

type ReplyButton = {
  id: string;
  title: string;
  isPressed?: boolean;
};

/** The strip of actions and supporting text under a finished response. */
const ActionRow = ({
  hoverOnly,
  children,
}: {
  hoverOnly: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={clsx(
      "gooey-feedback-actions d-flex align-center gmt-2 justify-content-start",
      hoverOnly && "is-hover-only",
      isMobile() && "is-mobile",
    )}
  >
    {children}
  </div>
);

const IncomingMsgActions = ({
  data,
  showRunLink,
  showRunTime,
  isLatestResponse,
  messageId,
  hasText,
  hasContent,
  measuredSec,
  toolCallsSummary,
  isToolsExpanded,
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
  showRunTime: boolean;
  isLatestResponse: boolean;
  messageId: string;
  hasText: boolean;
  hasContent: boolean;
  measuredSec: number | null;
  // "Used N tools", already built by IncomingMsg; null when no tools ran
  toolCallsSummary: React.ReactNode;
  isToolsExpanded: boolean;
}) => {
  const { buttons = [], bot_message_id } = data;
  const locationModalRef = useRef<LocationModalRef | null>(null);
  const { initializeQuery } = useMessagesContext();

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

  // How long a run took is off by default: on a customer's own site it reads
  // as a report card on their agent, not as information their visitors asked
  // for. Gooey's own surfaces, where the number is the point, opt in.
  //
  // Whoever actually knows wins: `run_time_sec` is what the stream's final
  // response carries, a bare `run_time` is accepted too so a host controller
  // can use the name its own payloads use, and the browser's own measurement
  // is the last resort for a response that streamed without either.
  const runTimeStr = showRunTime
    ? formatRunTime(data?.run_time_sec ?? data?.run_time ?? measuredSec)
    : "";
  // The response reports its own stamp again now, so either half is reason
  // enough to draw the row.
  const hasTiming = Boolean(runTimeStr || data?.created_at);
  // Copy puts the rendered message body on the clipboard, so it needs a body.
  const showCopy = hasText;
  const showDebugLink = showRunLink && Boolean(data?.web_url);
  // The action row stands on its own: thumbs are optional extras the backend
  // adds, not the reason the row exists. An empty response is the exception —
  // it paints no bubble, so a lone timestamp would float in the gutter — unless
  // tools ran: their summary lives on this row and gives it something to anchor.
  const showActions =
    Boolean(toolCallsSummary) ||
    (hasContent &&
      (hasTiming || showCopy || thumbButtons.length > 0 || showDebugLink));
  // An open tool table pins an older response's row. Hover-only would fade the
  // table out from under the reader the moment the pointer left the message.
  const hoverOnly = !isLatestResponse && !isToolsExpanded;

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
        <ActionRow hoverOnly={hoverOnly}>
          {/* Copy Text Message to clipboard */}
          {showCopy && (
            <CopyButton
              label="Copy Message"
              className="d-flex justify-content-center align-items-center h-100"
              onCopy={(event) =>
                copyRenderedMessageToClipboard({
                  currentTarget: event.currentTarget,
                  messageId,
                })
              }
            />
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
            <GooeyTooltip text="Debug this run">
              {/* The tooltip's own click handler calls preventDefault, and an
                  ancestor doing that cancels a link's navigation. Keeping the
                  click here leaves the handler unreached and the link working. */}
              <a
                href={data?.web_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton className="text-muted d-flex justify-content-center align-items-center h-100">
                  <IconBug size={ACTION_ICON_SIZE} />
                </IconButton>
              </a>
            </GooeyTooltip>
          )}
          <MessageTimeLabel
            createdAt={data?.created_at}
            runTimeStr={runTimeStr}
            className="gml-4"
          />
          {toolCallsSummary && hasTiming && (
            <span className="font_12_400 text-muted" aria-hidden="true">
              ·
            </span>
          )}
          {/* Last on the row: the disclosure that opens the table beneath it */}
          {toolCallsSummary}
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
          {/* IconButton, not Button: Button wraps its children in a div, whose
              line box is sized by the inherited font and leaves the box 2px
              taller than the row's other buttons with the glyph sitting high
              in it. An icon-only button has no use for that wrapper. */}
          <IconButton
            key={button.id}
            className="text-muted d-flex justify-content-center align-items-center h-100"
            onClick={onClick}
          >
            {icon}
          </IconButton>
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
    showRunTime: boolean;
    showToolCalls: boolean;
    // The newest response keeps its action row on show; every response behind
    // it reveals one on hover. Absent, a response is treated as the newest,
    // so a caller that renders a response on its own does not lose the row.
    isLatestResponse?: boolean;
    // Off for a response rendered as a still picture of itself — the share
    // card, whose container sets `pointer-events: none`, so a copy button
    // there could only be looked at.
    showActionRow?: boolean;
    // from the message list; absent where there is no list to scroll
    revealInList?: (target: Element, keep: Element) => void;
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
    const isStreaming = isReplyStreaming(props.data);
    const hasText = hasResponseText(props.data);
    // Every streamed chunk re-renders this message, and the extraction
    // JSON.parses each call's arguments and each result's content — thousands
    // of characters on a run with any real tool output. `final_prompt` is a
    // fresh array per chunk (see useStreamingHandler), so this recomputes when
    // the prompt actually grows and not on unrelated re-renders.
    const toolCalls = useMemo(
      () =>
        // `FinalResponse` types final_prompt as `string | unknown[]`, so the
        // completed run can land a string here. Iterating one yields its
        // characters and quietly produces nothing; say so instead.
        props?.showToolCalls && Array.isArray(props?.data?.final_prompt)
          ? extractToolCallsFromFinalPrompt(props.data.final_prompt).filter(
              (toolCall) => !UNCOUNTED_TOOL_NAMES.includes(toolCall.name),
            )
          : [],
      [props?.showToolCalls, props?.data?.final_prompt],
    );
    // Reasoning reaches the widget in exactly one place: raw_output_text on the
    // final response. The streamed message_part text carries no <think> tags at
    // all -- the server consumes them in send_msg (daras_ai_v2/bots.py:265) and
    // discards the thinking it separates -- so there is nothing to split during
    // the run, and splitting per chunk would be dead work on every message.
    //
    // This is also why a reopened conversation still shows it: ConversationLayer
    // puts whole message objects into IndexedDB, raw_output_text among them, so
    // the reasoning comes back with the message and no server is asked.
    const rawOutputText = (props?.data as FinalResponse)?.raw_output_text?.[0];
    const { thinking } = useMemo(
      () => splitThinking(rawOutputText ?? ""),
      [rawOutputText],
    );
    const { measuredSec } = useStreamTimer(isStreaming);
    // Owned here, not by ToolCalls: the summary changes parent when the run ends
    // (status line -> action row) and remounts, but this component keeps its key.
    const [isToolsExpanded, setIsToolsExpanded] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    // Nothing has arrived yet, so there is nothing to put a row under.
    if (
      !props.data ||
      type === STREAM_MESSAGE_TYPES.CONVERSATION_START ||
      type === STREAM_MESSAGE_TYPES.RUN_START
    ) {
      return <ResponseLoader show={true} />;
    }

    // On the action row once the run has ended and there is one; until then, and
    // on the share card (which has no row), it ends the bubble instead.
    const toolsOnActionRow = !isStreaming && props.showActionRow !== false;
    // Opening grows this message below the fold: commit the table first, then
    // have the list bring it into view, keeping the clicked line on screen.
    const toggleTools = (summary: HTMLElement) => {
      const opening = !isToolsExpanded;
      flushSync(() => setIsToolsExpanded(opening));
      if (opening && rootRef.current) {
        props.revealInList?.(rootRef.current, summary);
      }
    };
    const toolCallsSummary = (
      <ToolCalls
        toolCalls={toolCalls}
        lead={
          isStreaming ? (
            <StatusLine
              label={
                getRunningToolsLabel(toolCalls) ??
                getStatusLabel(props?.data?.detail)
              }
            />
          ) : undefined
        }
        isExpanded={isToolsExpanded}
        onToggle={toggleTools}
        thinking={thinking}
        thinkingDurationSec={
          (props?.data as FinalResponse)?.metrics?.thinking_duration_sec
        }
      />
    );

    return (
      <div ref={rootRef} className="gooey-incomingMsg gpb-12 mw-100">
        <div
          className={clsx(
            `gpl-${MESSAGE_GUTTER} gpr-${MESSAGE_GUTTER}`,
            "gooey-incoming-content mw-100",
          )}
        >
          {/* Bubble chrome only once there is something in it — an empty
              response must not paint an empty bubble in themes that style it. */}
          <div
            className={clsx(
              (hasText ||
                isStreaming ||
                ((toolCalls.length > 0 || !!thinking) && !toolsOnActionRow)) &&
                "gooey-incoming-bubble",
            )}
          >
            {/* No empty markdown container during the status-only phase: themes
                give `.markdown` spacing, which would pad an empty bubble. */}
            {(!isStreaming || hasText) && (
              <GooeyTextResponse
                data={props.data}
                linkColor={props?.linkColor}
                showSources={props?.showSources}
                isStreaming={isStreaming}
                id={props?.id}
              />
            )}
            {!toolsOnActionRow && toolCallsSummary}
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
          {/* The row belongs to a finished response. Copy and the timestamp do
              not depend on the backend sending any reply buttons, so the row is
              not gated on them. */}
          {!isStreaming && props.showActionRow !== false && (
            <IncomingMsgActions
              data={props?.data}
              showRunLink={props.showRunLink}
              showRunTime={props.showRunTime}
              isLatestResponse={props.isLatestResponse ?? true}
              messageId={props.id}
              hasText={hasText}
              hasContent={hasText || Boolean(audioTrack) || Boolean(videoTrack)}
              measuredSec={measuredSec}
              toolCallsSummary={
                toolCalls.length > 0 || thinking ? toolCallsSummary : null
              }
              isToolsExpanded={isToolsExpanded}
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
