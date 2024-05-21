import { useSystemContext } from "src/contexts/hooks";
import Sources from "./Sources";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import ResponseLoader from "../Loader";

import { addInlineStyle } from "src/addStyles";
import style from "./incoming.scss?inline";
import { formatTextResponse } from "./helpers";
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
  const { references = [], output_audio = [], type } = props.data;
  const audioTrack = output_audio[0];
  const isStreaming = type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE;
  const parsedElements = formatTextResponse(props.data);
  if (!parsedElements) return <ResponseLoader show={true} />;
  return (
    <div className="gooey-incomingMsg gpb-12 gpr-8">
      {config?.showSources && <Sources data={references} />}
      <div className="gpl-16">
        <BotMessageLayout />
        <div className="gml-36 gmt-4">
          <span
            style={{ maxWidth: "calc(100% - 36px)" }}
            className="font_16_400 anim-typing gooey-output-text pos-relative"
            id={props?.id}
          >
            {parsedElements}
          </span>
          {isStreaming && (
            <span style={{ display: "inline", marginBottom: "-2px" }}>
              <CircleBeat className="anim-blink gml-4" size={16} />
            </span>
          )}
        </div>
        {audioTrack && (
          <div className="gmt-16">
            <audio controls src={audioTrack}></audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomingMsg;
