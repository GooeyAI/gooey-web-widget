import { addInlineStyle } from "src/addStyles";
import style from "./outgoing.scss?inline";
import { memo, useState } from "react";
import FilePreview from "../ChatInput/FilePreview";
import clsx from "clsx";
import { MESSAGE_GUTTER } from "../constants";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconCheck from "src/assets/SvgIcons/IconCheck";
import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import IconButton from "src/components/shared/Buttons/IconButton";
import Button from "src/components/shared/Buttons/Button";
import GooeyTooltip from "src/components/shared/Tooltip";
import { useCopyFeedback } from "src/components/shared/useCopyFeedback";
import { useMessagesContext } from "src/contexts/hooks";
import GooeyTextArea from "../ChatInput/GooeyTextArea";
addInlineStyle(style);

interface ButtonPressed {
  button_id: string;
  context_msg_id: string;
  button_title?: string | null;
}

interface OutgoingMsgProps {
  id?: string;
  created_at?: string;
  input_prompt?: string;
  input_audio?: Blob | string | string[];
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
    id,
    created_at,
    input_prompt = "",
    input_audio = undefined,
    button_pressed = undefined,
    input_location: { latitude, longitude } = {},
    input_images = [],
    input_documents = [],
  }: OutgoingMsgProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState("");
    const { editQuery, isSending, isReceiving } = useMessagesContext();

    let mapUrl;
    if (latitude && longitude) {
      mapUrl = buildOpenStreetMapEmbedUrl(latitude, longitude);
    } else {
      input_prompt ||= button_pressed?.button_title || "";
    }

    const input_audio_url = resolveInputAudioUrl(input_audio);

    const timeStr = formatMessageTime(created_at);
    const reusableAudio = Array.isArray(input_audio)
      ? input_audio[0]
      : input_audio;
    const hasAttachments =
      input_images.length > 0 ||
      input_documents.length > 0 ||
      Boolean(reusableAudio);
    const isBusy = Boolean(isSending || isReceiving);
    const canSendEdit = Boolean(editValue.trim() || hasAttachments);

    const handleCopy = async () => {
      try {
        await navigator.clipboard?.writeText(input_prompt || "");
      } catch (e) {
        console.error("Failed to copy message", e);
      }
    };

    const handleStartEdit = () => {
      if (isBusy) return;
      setEditValue(input_prompt || "");
      setIsEditing(true);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditValue("");
    };

    const handleSendEdit = () => {
      const text = editValue.trim();
      if (!id || isBusy || (!text && !hasAttachments)) return;
      setIsEditing(false);
      editQuery?.(id, {
        input_prompt: text,
        input_images,
        input_documents,
        input_audio: reusableAudio,
      });
    };

    return (
      <div className="d-flex flex-col align-end">
        <div
          className={clsx(
            "gooey-outgoingMsg d-flex flex-col align-end",
            isEditing && "is-editing",
          )}
        >
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
          {input_audio_url && (
            <div
              className={clsx(
                `gpr-${MESSAGE_GUTTER}`,
                input_prompt && "gmt-16",
              )}
            >
              <AudioPlayer url={input_audio_url} />
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
          {isEditing ? (
            <EditMessage
              value={editValue}
              onChange={setEditValue}
              onCancel={handleCancelEdit}
              onSend={handleSendEdit}
              canSend={canSendEdit}
              isBusy={isBusy}
            />
          ) : (
            <DisplayMessage
              text={input_prompt}
              timeStr={timeStr}
              isBusy={isBusy}
              onCopy={handleCopy}
              onEdit={handleStartEdit}
              canEdit={Boolean(editQuery)}
            />
          )}
        </div>
      </div>
    );
  },
);

export default OutgoingMsg;

interface DisplayMessageProps {
  text: string;
  timeStr: string;
  isBusy: boolean;
  onCopy: () => void | Promise<void>;
  onEdit: () => void;
  canEdit: boolean;
}

/**
 * Read-only user message: text bubble (with expand/collapse) and the hover
 * toolbar (time, Copy, Edit). Renders nothing when there is no text.
 */
function DisplayMessage({
  text,
  timeStr,
  isBusy,
  onCopy,
  onEdit,
  canEdit,
}: DisplayMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { copied, signalCopied } = useCopyFeedback();
  // Nothing to show without text (e.g. an attachment-only message): the bubble
  // and the Copy/Edit actions all operate on text, so render nothing.
  if (!text) return null;

  // Large = more than 200 characters or more than 5 lines
  const isLargeMessage = text.length > 200 || text.split("\n").length > 5;
  const displayText =
    isLargeMessage && !isExpanded ? getTruncatedText(text) : text;

  return (
    <>
      <div
        className={clsx(
          "d-flex align-start pos-relative gooey-outgoing-text br-large gp-8 gmt-8",
          `gmr-${MESSAGE_GUTTER}`,
        )}
      >
        <p
          className={clsx(
            "font_16_400 gp-4 overflow-hidden",
            isLargeMessage && !isExpanded && "gooey-outgoing-text-collapsed",
          )}
        >
          {displayText}
        </p>
        {isLargeMessage && (
          <div>
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
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </IconButton>
            </GooeyTooltip>
          </div>
        )}
      </div>
      <div
        className={clsx(
          "gooey-outgoing-actions d-flex align-center gmt-4",
          `gmr-${MESSAGE_GUTTER}`,
        )}
      >
        {timeStr && (
          <span className="font_12_400 text-muted gmr-4">{timeStr}</span>
        )}
        <GooeyTooltip
          text={copied ? "Copied" : "Copy"}
          direction="bottom"
          forceShow={copied}
        >
          <IconButton
            className="text-muted"
            onClick={async () => {
              await onCopy();
              signalCopied();
            }}
            aria-label="Copy"
          >
            {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
          </IconButton>
        </GooeyTooltip>
        {!isBusy && canEdit && (
          <GooeyTooltip text="Edit" direction="bottom">
            <IconButton
              className="text-muted"
              onClick={onEdit}
              disabled={isBusy}
              aria-label="Edit"
            >
              <IconPencilEdit size={18} />
            </IconButton>
          </GooeyTooltip>
        )}
      </div>
    </>
  );
}

interface EditMessageProps {
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSend: () => void;
  canSend: boolean;
  isBusy: boolean;
}

/** Inline editor for a user message: textarea with Cancel/Send actions. */
function EditMessage({
  value,
  onChange,
  onCancel,
  onSend,
  canSend,
  isBusy,
}: EditMessageProps) {
  return (
    <div
      className={clsx(
        "gooey-outgoing-edit gmt-8 gmb-8 d-flex flex-col align-end",
        `gpr-${MESSAGE_GUTTER} gpl-${MESSAGE_GUTTER}`,
      )}
    >
      <GooeyTextArea
        id="edit-message-input"
        className="w-100 font_16_400"
        value={value}
        rows={4}
        autoFocus
        minHeight={88}
        maxHeight={200}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => {
          const textarea = e.currentTarget;
          requestAnimationFrame(() => {
            const end = textarea.value.length;
            textarea.setSelectionRange(end, end);
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          } else if (e.key === "Escape") {
            onCancel();
          }
        }}
      />
      <div className="d-flex justify-end align-center gmt-8 gap-8">
        <Button variant="text" className="font_14_500" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="filled"
          className="font_14_600"
          onClick={onSend}
          disabled={isBusy || !canSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

function formatMessageTime(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

// Truncate text for collapsed view (first 200 characters or first 3 lines)
function getTruncatedText(text: string): string {
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
}

function resolveInputAudioUrl(
  input_audio?: Blob | string | string[],
): string | undefined {
  if (!input_audio) return undefined;
  if (Array.isArray(input_audio)) return input_audio[0];
  if (typeof input_audio === "string") return input_audio;
  return (URL || webkitURL).createObjectURL(input_audio as Blob);
}

function AudioPlayer({ url }: { url: string }) {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
  if (driveMatch) {
    const [loaded, setLoaded] = useState(false);
    return (
      <div style={{ position: "relative", width: 300, height: 80 }}>
        {!loaded && (
          <p
            className="font_14_400 text-muted"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Loading audio...
          </p>
        )}
        <iframe
          src={`https://drive.google.com/file/d/${driveMatch[1]}/preview`}
          width="300"
          height="80"
          allow="autoplay"
          onLoad={() => setLoaded(true)}
          style={{
            border: "none",
            borderRadius: "8px",
            opacity: loaded ? 1 : 0,
          }}
        />
      </div>
    );
  }
  return <audio controls src={url}></audio>;
}

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
