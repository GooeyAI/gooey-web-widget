import "./outgoing.scss";

const OutgoingMsg = (props: any) => {
  const { input_text = "Placeholder Text ....", input_prompt = "" } =
    props.data;
  return (
    <div className="gooey-outgoingMsg mb-12">
      <div className="d-flex align-center mb-8">
        <div
          className="bot-avatar bg-primary mr-12"
          style={{ width: "24px", height: "24px", borderRadius: "100%" }}
        >
        </div>
        <p className="font_16_600">You</p>
      </div>
      <p className="font_20_400 anim-typing"> {input_text || input_prompt}</p>
    </div>
  );
};

export default OutgoingMsg;
