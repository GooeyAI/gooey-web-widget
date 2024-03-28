import IconUserCircle from "src/assets/SvgIcons/IconUserCircle";
import "./outgoing.scss";

const OutgoingMsg = (props: any) => {
  const { input_text = "Placeholder Text ....", input_prompt = "" } =
    props.data;
  return (
    <div className="gooey-outgoingMsg mb-12">
      <div className="d-flex align-center mb-8">
        <IconUserCircle size={24} />
        <p className="font_16_600 ml-12">You</p>
      </div>
      <p className="font_20_400 anim-typing"> {input_text || input_prompt}</p>
    </div>
  );
};

export default OutgoingMsg;
