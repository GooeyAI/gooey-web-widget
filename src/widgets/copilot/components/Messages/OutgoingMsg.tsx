import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo, useState } from "react";
import FilePreview from "../ChatInput/FilePreview";
import clsx from "clsx";
import { MESSAGE_GUTTER } from ".";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconButton from "src/components/shared/Buttons/IconButton";
import GooeyTooltip from "src/components/shared/Tooltip";
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
    const [isExpanded, setIsExpanded] = useState(false);

    let mapUrl;
    if (latitude && longitude) {
      mapUrl = buildOpenStreetMapEmbedUrl(latitude, longitude);
    } else {
      input_prompt ||= button_pressed?.button_title || "";
    }

    // Determine if message is large (more than 200 characters or more than 5 lines)
    const isLargeMessage =
      input_prompt &&
      (input_prompt.length > 200 || input_prompt.split("\n").length > 5);

    // Truncate text for collapsed view (first 200 characters or first 3 lines)
    const getTruncatedText = (text: string): string => {
      const lines = text.split("\n");
      // If more than 3 lines, show first 3 lines with ellipsis
      if (lines.length > 3) {
        const firstThreeLines = lines.slice(0, 3).join("\n");
        // Make sure we don't exceed 200 chars even with line breaks
        if (firstThreeLines.length > 200) {
          return firstThreeLines.slice(0, 200).trim() + "...";
        }
        return firstThreeLines + "...";
      }
      // If single line or few lines but long text, truncate to 200 chars
      if (text.length > 200) {
        // Try to break at word boundary if possible
        const truncated = text.slice(0, 200);
        const lastSpace = truncated.lastIndexOf(" ");
        // If we find a space near the end (within last 30 chars), break there
        if (lastSpace > 170) {
          return truncated.slice(0, lastSpace) + "...";
        }
        return truncated.trim() + "...";
      }
      return text;
    };

    const displayText =
      isLargeMessage && !isExpanded
        ? getTruncatedText(input_prompt)
        : input_prompt;

    return (
      <div className="d-flex flex-col align-end">
        <div className="gooey-outgoingMsg gmb-24 d-flex flex-col align-end">
          {input_images && input_images.length > 0 && (
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
            <div
              className={clsx(
                "d-flex align-start pos-relative gooey-outgoing-text br-large gp-8 gmt-8",
                `gmr-${MESSAGE_GUTTER}`,
              )}
            >
              <p
                className={clsx(
                  "font_16_400 gp-4 overflow-hidden",
                  isLargeMessage &&
                    !isExpanded &&
                    "gooey-outgoing-text-collapsed",
                )}
              >
                {displayText}
              </p>
              {isLargeMessage && (
                <div
                // style={{
                //   position: "absolute",
                //   right: "8px",
                //   top: "4px",
                //   zIndex: 1000,
                // }}
                >
                  <GooeyTooltip
                    text={isExpanded ? "Collapse message" : "Expand message"}
                  >
                    <IconButton
                      className="gooey-outgoing-expand-btn gmt-4"
                      variant="text"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <IconChevronDown
                        size={16}
                        style={{
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </IconButton>
                  </GooeyTooltip>
                </div>
              )}
            </div>
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
