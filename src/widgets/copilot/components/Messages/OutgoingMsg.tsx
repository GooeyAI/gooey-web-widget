import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo } from "react";
import FilePreview from "../ChatInput/FilePreview";
import clsx from "clsx";
import { MESSAGE_GUTTER } from ".";
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
  input_documents?: string[];
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
    button_pressed = undefined,
    input_location: { latitude, longitude } = {},
    input_images = [],
    input_documents = [],
  }: OutgoingMsgProps) => {
    let mapUrl;
    if (latitude && longitude) {
      mapUrl = buildOpenStreetMapEmbedUrl(latitude, longitude);
    } else {
      input_prompt ||= button_pressed?.button_title || "";
    }

    return (
      <div className="d-flex flex-col align-end">
        <div className="gooey-outgoingMsg gmb-24 d-flex flex-col align-end">
          {input_images.length > 0 && (
            <div
              className={clsx(
                `gpr-${MESSAGE_GUTTER}`,
                input_prompt && "gmt-16",
              )}
            >
              <FilePreview
                files={input_images.map((url: string) => ({
                  url,
                  title: url,
                  refNumber: "",
                  type: "image",
                }))}
              />
            </div>
          )}
          {input_documents.length > 0 && (
            <div
              className={clsx(
                `gpr-${MESSAGE_GUTTER}`,
                input_prompt && "gmt-16",
              )}
            >
              <FilePreview
                files={input_documents.map((url: string) => ({
                  url,
                  title: url,
                  refNumber: "",
                }))}
              />
            </div>
          )}
          {input_audio && (
            <div
              className={clsx(
                `gpr-${MESSAGE_GUTTER}`,
                input_prompt && "gmt-16",
              )}
            >
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
            <p
              className={clsx(
                "font_16_400 gooey-outgoing-text gp-8 gpl-12 gpr-12 gm-4 br-large",
                `gmr-${MESSAGE_GUTTER}`,
              )}
            >
              {input_prompt}
            </p>
          )}
          {latitude && longitude && (
            <div
              className={clsx(
                `gpr-${MESSAGE_GUTTER}`,
                input_prompt && "gmt-16",
              )}
            >
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
            </div>
          )}
        </div>
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
