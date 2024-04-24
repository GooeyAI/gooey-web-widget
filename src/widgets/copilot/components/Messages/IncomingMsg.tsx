import { useSystemContext } from "src/contexts/hooks";
import "./incoming.scss";
import Sources from "./Sources";
import { STREAM_MESSAGE_TYPES } from "src/api/streaming";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import ResponseLoader from "../Loader";

export const BotMessageLayout = () => {
  const { config } = useSystemContext();
  const { display_picture, title }: any = config?.bot_profile;
  return (
    <div className="d-flex align-center">
      <div
        className="bot-avatar bg-primary gmr-12"
        style={{ width: "24px", height: "24px", borderRadius: "100%" }}
      >
        <img
          src={display_picture}
          alt="bot-avatar"
          style={{ width: "24px", height: "24px", borderRadius: "100%" }}
        />
      </div>
      <p className="font_14_600">{title}</p>
    </div>
  );
};
const getOutputText = (data: any) => {
  const { type = "", status = "", text, detail, output_text = {} } = data;
  if (type === STREAM_MESSAGE_TYPES.MESSAGE_PART) {
    if (text) return text;
    else return detail;
  }
  if (type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE && status === "completed") {
    return output_text[0];
  }
};

function linkifyText(text) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Replace URLs with <a> tags
  return text.replaceAll(urlRegex, function(url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
  });
}

const IncomingMsg = (props: any) => {
  const { config } = useSystemContext();
  const { references = [], output_audio = [], type } = props.data;
  const audioTrack = output_audio[0];
  const output = getOutputText(props.data);
  const isStreaming = type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE;
  if(!output) return <ResponseLoader show={true} />;
  return (
    <div className="gooey-incomingMsg gpb-12 gpr-8">
      {config?.show_sources && <Sources data={references} />}
      <BotMessageLayout />
      <div className="gml-36 gmt-4">
        <div>
          <p
            className="font_16_400 anim-typing gooey-output-text"
            id={props?.id}
            dangerouslySetInnerHTML={{ __html: linkifyText(output) }}
          />
          {isStreaming && (
            <CircleBeat
              className="anim-blink gml-4"
              size={16}
              style={{ display: "inline", marginBottom: '-2px' }}
            />
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
