import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo } from "react";
import clsx from "clsx";
addInlineStyle(style);

interface ButtonPressed {
  button_id: string;
  context_msg_id: string;
  button_title?: string | null;
}

interface OutgoingMsgProps {
  input_prompt?: string;
  input_audio?: Blob;
  input_images?: string[];
  button_pressed?: ButtonPressed;
  input_location?: {
    latitude?: number;
    longitude?: number;
  };
}

const OutgoingMsg = memo(
  ({
    input_prompt = "",
    input_audio = undefined,
    input_images = [],
    button_pressed = undefined,
    input_location: { latitude, longitude } = {},
  }: OutgoingMsgProps) => {
    let mapUrl;
    if (latitude && longitude) {
      mapUrl = buildOpenStreetMapEmbedUrl(latitude, longitude);
    } else {
      input_prompt ||= button_pressed?.button_title || "";
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
                  input_prompt && "gmb-4",
                )}
              />
            </a>
          ))}
        {input_audio && (
          <div className="gmt-16">
            <audio
              controls
              src={
                typeof input_audio === "string"
                  ? input_audio
                  : (URL || webkitURL).createObjectURL(input_audio as Blob)
              }
            ></audio>
          </div>
        )}
        {input_prompt && (
          <p className="font_20_400 anim-typing gooey-outgoing-text">
            {input_prompt}
          </p>
        )}
        {latitude && longitude && (
          <iframe
            width="100%"
            height="200px"
            src={mapUrl}
            loading="lazy"
            style={{
              border: "1px solid #ddd",
              aspectRatio: "16/9",
              borderRadius: "8px",
            }}
          ></iframe>
        )}
      </div>
    );
  },
);

export default OutgoingMsg;

function buildOpenStreetMapEmbedUrl(
  latitude: number,
  longitude: number,
): string {
  const coords = calculateBoundingBox(latitude, longitude);
  const bbox = coords.join(",");
  const url = new URL("https://www.openstreetmap.org/export/embed.html");
  url.searchParams.set("bbox", bbox);
  url.searchParams.set("layer", "mapnik");
  url.searchParams.set("marker", [latitude, longitude].join(","));
  return url.toString();
}

function calculateBoundingBox(
  lat: number,
  lon: number,
  zoom: number = 16,
): [number, number, number, number] {
  const degreesPerTile = 360 / Math.pow(2, zoom);
  const halfTile = degreesPerTile / 2;

  const minLon = lon - halfTile;
  const maxLon = lon + halfTile;
  const minLat = lat - halfTile;
  const maxLat = lat + halfTile;

  return [minLon, minLat, maxLon, maxLat];
}
