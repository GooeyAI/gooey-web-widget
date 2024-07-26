import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo } from "react";
import IconUserCircle from "src/assets/SvgIcons/IconUserCircle";
import clsx from "clsx";
addInlineStyle(style);

const OutgoingMsg = memo((props: any) => {
  const { input_prompt = "", input_audio = "", input_images = [] } = props.data;
  return (
    <div className="gooey-outgoingMsg gmb-12 gpl-16">
      <div className="d-flex align-center gmb-8">
        <IconUserCircle size={24} />
        <p className="font_16_600 gml-12">You</p>
      </div>
      {input_images.length > 0 &&
        input_images.map((url: string) => (
          <a href={url} target="_blank">
            <img
              src={url}
              alt={url}
              className={clsx(
                "outgoingMsg-image b-1 br-large",
                input_prompt && "gmb-4"
              )}
            />
          </a>
        ))}
      {input_audio && (
        <div className="gmt-16">
          <audio
            controls
            src={(URL || webkitURL).createObjectURL(input_audio as Blob)}
          ></audio>
        </div>
      )}
      {input_prompt && (
        <p className="font_20_400 anim-typing gooey-outgoing-Text">
          {input_prompt}
        </p>
      )}
    </div>
  );
});

export default OutgoingMsg;
