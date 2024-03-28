import { useSystemContext } from "src/contexts/hooks";
import "./incoming.scss";

const IncomingMsg = (props: any) => {
  const { output_text = "Placeholder Text ...." } = props.data;
  const { botProfile }: any = useSystemContext();
  return (
    <div className="gooey-incomingMsg pb-16 mb-16 pt-16 pr-8">
      <div className="d-flex align-center">
        <div
          className="bot-avatar bg-primary mr-12"
          style={{ width: "24px", height: "24px", borderRadius: "100%" }}
        >
          <img
            src={botProfile?.display_picture}
            alt="bot-avatar"
            style={{ width: "24px", height: "24px", borderRadius: "100%" }}
          />
        </div>
        <p className="font_14_600">{botProfile?.title}</p>
      </div>
      <div className="ml-36 mt-4">
        <p className="font_16_400 anim-typing">{output_text}</p>
      </div>
    </div>
  );
};

export default IncomingMsg;
