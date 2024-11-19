import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo } from "react";
import clsx from "clsx";
addInlineStyle(style);

const OutgoingMsg = memo((props: any) => {
  const { input_prompt = "", input_audio = "", input_images = [] } = props.data;
  return (
    <div className="gooey-outgoingMsg gmb-12 gpl-16">
      {input_images.length > 0 &&
        input_images.map((url: string) => (
          <a href={url} target="_blank">
            <img
              src={url}
              alt={url}
              className={clsx(
                "outgoingMsg-image b-1 br-large",
                input_prompt && "gmb-4",
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
        <p className="font_20_400 anim-typing gooey-outgoing-text">
          {input_prompt}
        </p>
      )}
    </div>
  );
});

export default OutgoingMsg;
