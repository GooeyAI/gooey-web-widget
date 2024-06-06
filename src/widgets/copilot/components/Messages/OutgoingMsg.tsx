import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo } from "react";
import IconUserCircle from "src/assets/SvgIcons/IconUserCircle";
addInlineStyle(style);

const OutgoingMsg = memo((props: any) => {
  const { input_text = "", input_prompt = "", input_audio = "" } = props.data;
  return (
    <div className="gooey-outgoingMsg gmb-12 gpl-16">
      <div className="d-flex align-center gmb-8">
        <IconUserCircle size={24} />
        <p className="font_16_600 gml-12">You</p>
      </div>
      {input_audio && (
        <div className="gmt-16">
          <audio controls src={input_audio}></audio>
        </div>
      )}
      {input_text && (
        <p className="font_20_400 anim-typing gooey-outgoing-Text">
          {input_text || input_prompt}
        </p>
      )}
    </div>
  );
});

export default OutgoingMsg;
