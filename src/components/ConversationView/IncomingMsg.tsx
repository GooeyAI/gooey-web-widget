import { memo, useEffect, useState } from "react";
import clsx from "clsx";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import ResponseLoader from "../../widgets/copilot/components/Loader";
import { FeedbackButtons } from "./FeedbackButtons";
import { SourcesSection } from "./Sources";
import { formatTextResponse } from "./helpers";
import { addInlineStyle } from "src/addStyles";
import style from "./incoming.scss?inline";
import { BotMessageLayout } from "./BotMessageLayout";

addInlineStyle(style);

type IncomingMsgProps = {
  data: any;
  id: string;
  showSources: boolean;
  linkColor: string;
  autoPlay?: boolean;
  photoUrl?: string;
  onFeedbackClick: (button: {
    id: string;
    title: string;
  }) => void;
  layoutController?: {
    toggleSecondaryDrawer: (content: any) => void;
  };
};

const IncomingMsg = memo(
  ({ data, id, showSources, linkColor, autoPlay, photoUrl, onFeedbackClick, layoutController }: IncomingMsgProps) => {
    const {
      output_audio = [],
      output_video = [],
      type,
      references = [],
    } = data;

    const audioTrack = output_audio[0];
    const videoTrack = output_video[0];
    const isStreaming = type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE;
    const [parsedElements, setParsedElements] = useState<string>("");

    useEffect(() => {
      setParsedElements(formatTextResponse(data, linkColor, showSources) as string)
    },[data])

    if (!parsedElements) return <ResponseLoader show={true} />;

    return (
      <div className="gooey-incomingMsg gpb-12 mw-100">
        <div className="gpl-16 mw-100">
          <BotMessageLayout photoUrl={photoUrl}>
            <div
              className={clsx(
                "font_16_400 pos-relative gooey-output-text markdown text-reveal-container mw-100",
                isStreaming && "response-streaming"
              )}
              id={id}
            >
              {parsedElements}
            </div>
          </BotMessageLayout>

          {!isStreaming && !videoTrack && audioTrack && (
            <div className="gmt-8 gml-36 mw-100">
              <audio
                autoPlay={autoPlay}
                playsInline
                controls
                src={audioTrack}
              />
            </div>
          )}

          {!isStreaming && videoTrack && (
            <div className="gmt-16 gml-36">
              <video
                autoPlay={autoPlay}
                playsInline
                controls
                src={videoTrack}
                style={{ backgroundColor: "#000" }}
              />
            </div>
          )}

          {!isStreaming && data.buttons && (
            <FeedbackButtons
              data={data}
              onFeedbackClick={(button) => {
                onFeedbackClick({
                  id: button.id,
                  title: button.title,
                });
              }}
            />
          )}
        </div>

        {showSources && !!references.length && (
          <SourcesSection {...data} layoutController={layoutController} />
        )}
      </div>
    );
  }
);

export default IncomingMsg;
