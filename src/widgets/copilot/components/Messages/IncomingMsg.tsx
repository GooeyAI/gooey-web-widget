import { useSystemContext } from "src/contexts/hooks";
import "./incoming.scss";
import Sources from "./Sources";

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

const IncomingMsg = (props: any) => {
  const { config } = useSystemContext();
  const {
    output_text = "Placeholder Text ....",
    references = [],
    output_audio = [],
  } = props.data;
  const audioTrack = output_audio[0];
  return (
    <div className="gooey-incomingMsg gpb-12 gpr-8">
      {config?.show_sources && <Sources data={references} />}
      <BotMessageLayout />
      <div className="gml-36 gmt-4">
        <p
          className="font_16_400 anim-typing gooey-output-text"
          id={props?.id}
          dangerouslySetInnerHTML={{ __html: output_text }}
        />
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
