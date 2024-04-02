import { useSystemContext } from "src/contexts/hooks";
import "./incoming.scss";
import Sources from "./Sources";

export const BotMessageLayout = () => {
  const { config } = useSystemContext()
  const { display_picture, title }: any = config?.bot_profile;
  return (
    <div className="d-flex align-center">
      <div
        className="bot-avatar bg-primary mr-12"
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
  const { output_text = "Placeholder Text ....", references = [] } = props.data;
  return (
    <div className="gooey-incomingMsg pb-12 pr-8" >
      {config?.show_sources && <Sources data={references} />}
      <BotMessageLayout />
      <div className="ml-36 mt-4">
        <p className="font_16_400 anim-typing" id={props?.id}>{output_text}</p>
      </div>
    </div>
  );
};

export default IncomingMsg;
