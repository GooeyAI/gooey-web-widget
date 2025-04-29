import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo } from "react";
import clsx from "clsx";
import { calculateBoundingBox } from "./LocationModal";
addInlineStyle(style);

const OutgoingMsg = memo((props: any) => {
  let {
    input_prompt = "",
    input_audio = "",
    input_images = [],
    button_pressed = {},
    input_location = {},
  } = props.data;

  const { latitude, longitude } = input_location || {};
  const hasValidLocation = latitude !== undefined && longitude !== undefined;

  input_prompt ||= hasValidLocation ? "" : button_pressed?.button_title || "";

  const zoomLevel = 16;
  let bbox = "";

  if (hasValidLocation) {
    const [minLon, minLat, maxLon, maxLat] = calculateBoundingBox(
      latitude,
      longitude,
      zoomLevel
    );
    bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
  }

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
        <p className="font_20_400 anim-typing gooey-outgoing-text">
          {input_prompt}
        </p>
      )}
      {hasValidLocation && (
        <iframe
          width="100%"
          height="200px"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${input_location.latitude},${input_location.longitude}`}
          loading="lazy"
          style={{
            border: "1px solid black",
            aspectRatio: "16/9",
            borderRadius: "8px",
          }}
        ></iframe>
      )}
    </div>
  );
});

export default OutgoingMsg;
