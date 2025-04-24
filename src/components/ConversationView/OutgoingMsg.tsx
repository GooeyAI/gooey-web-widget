import { memo } from "react";
import clsx from "clsx";
import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";

addInlineStyle(style);

type OutgoingMsgProps = {
  input_prompt?: string;
  input_audio?: Blob;
  input_images?: string[];
  button_pressed?: {
    button_title?: string;
  };
};

const OutgoingMsg = memo(
  ({
    input_prompt = "",
    input_audio = undefined,
    input_images = [],
    button_pressed = {},
  }: OutgoingMsgProps) => {
    const prompt =
      input_prompt || button_pressed?.button_title || "";

    return (
      <div className="gooey-outgoingMsg gmb-12 gpl-16">
        {input_images.length > 0 &&
          input_images.map((url) => (
            <a href={url} target="_blank" key={url}>
              <img
                src={url}
                alt={url}
                className={clsx(
                  "outgoingMsg-image b-1 br-large",
                  prompt && "gmb-4"
                )}
              />
            </a>
          ))}

        {input_audio && (
          <div className="gmt-16">
            <audio
              controls
              src={URL.createObjectURL(input_audio)}
            />
          </div>
        )}

        {prompt && (
          <p className="font_20_400 anim-typing gooey-outgoing-text">
            {prompt}
          </p>
        )}
      </div>
    );
  }
);

export default OutgoingMsg;
