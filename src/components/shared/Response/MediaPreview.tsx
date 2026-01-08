import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import IconClose from "src/assets/SvgIcons/IconClose";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconDownload from "src/assets/SvgIcons/IconDownload";

type MediaType = "image" | "video";

type MediaPreviewProps = {
  src: string;
  alt?: string;
  mediaType?: MediaType;
  poster?: string;
  showActions?: boolean;
};

export const videoExtensions = new Set([
  "mp4",
  "webm",
  "ogg",
  "mov",
  "m4v",
  "avi",
  "mkv",
]);

export const imageExtensions = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "bmp",
  "ico",
]);

/**
 * Extract file extension from a URL (handles query params)
 */
const getExtensionFromUrl = (url: string): string | undefined => {
  return url.split("?")[0]?.split(".").pop()?.toLowerCase();
};

/**
 * Detect media type from URL - returns null if not a recognized media URL
 */
export const getMediaTypeFromUrl = (url: string): MediaType | null => {
  const ext = getExtensionFromUrl(url);
  if (!ext) return null;
  if (videoExtensions.has(ext)) return "video";
  if (imageExtensions.has(ext)) return "image";
  return null;
};

/**
 * Infer media type with fallback to image (for use when media type is expected)
 */
const inferMediaType = (src: string, explicit?: MediaType): MediaType => {
  if (explicit) return explicit;
  return getMediaTypeFromUrl(src) ?? "image";
};

const styleContent = `
  .gw-media-inline-btn {
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    line-height: 0;
  }
  .gw-media-inline-btn:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  .gw-media-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(15, 23, 42, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
    backdrop-filter: blur(8px);
  }
  .gw-media-surface {
    position: relative;
    background: #0b1021;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    max-width: 90vw;
    max-height: 90vh;
    width: fit-content;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .gw-media-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .gw-media-action-bar {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 10000;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .gw-media-action-btn,
  .gw-media-icon-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 600;
    transition: background 120ms ease, transform 120ms ease;
    color: #0b1021;
    background: #f1f5f9;
    border: 1px solid transparent;
  }
  .gw-media-icon-btn {
    padding: 8px;
    width: 34px;
    height: 34px;
    justify-content: center;
  }
  .gw-media-action-btn:hover,
  .gw-media-icon-btn:hover {
    background: #e2e8f0;
    border: 1px solid #000;
  }
  .gw-media-action-btn:active,
  .gw-media-icon-btn:active {
    transform: translateY(0);
  }
  .gw-media-action-btn:focus-visible,
  .gw-media-icon-btn:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  .gw-media-content img,
  .gw-media-content video {
    border-radius: 8px;
    object-fit: contain;
    background: #000;
  }
  .gw-media-inline-wrapper {
    position: relative;
    display: inline-block;
    line-height: 0;
  }
  .gw-media-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 8px;
  }
  .gw-media-play-icon {
    width: 48px;
    height: 48px;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.85;
    transition: opacity 150ms ease, transform 150ms ease;
  }
  .gw-media-inline-btn:hover .gw-media-play-icon {
    opacity: 1;
    transform: scale(1.08);
  }
  .gw-media-play-icon svg {
    width: 24px;
    height: 24px;
    margin-left: 3px;
    fill: #fff;
  }
`;

const MediaPreview = ({
  src,
  alt,
  mediaType,
  poster,
  showActions = true,
}: MediaPreviewProps) => {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const previousOverflowRef = useRef<string>();
  const resolvedType = useMemo(
    () => inferMediaType(src, mediaType),
    [mediaType, src],
  );

  useEffect(() => {
    if (!open) return;
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-media-preview-style", "true");
    styleTag.textContent = styleContent;
    document.head.appendChild(styleTag);

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      if (styleTag.parentNode === document.head) {
        document.head.removeChild(styleTag);
      }
      if (previousOverflowRef.current !== undefined) {
        document.body.style.overflow = previousOverflowRef.current;
      } else {
        document.body.style.removeProperty("overflow");
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) setIsCopied(false);
  }, [open]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(src);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (_err) {
      setIsCopied(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(src, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const filename = alt || src.split("/").pop()?.split("?")[0] || "media";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (_err) {
      window.open(src, "_blank", "noopener,noreferrer");
    }
  };

  const renderMedia = (variant: "inline" | "dialog") => {
    const commonStyle =
      variant === "inline"
        ? { maxWidth: "100%", height: "auto", display: "block" }
        : {
            maxWidth: "90vw",
            maxHeight: "85vh",
            width: "100%",
            height: "100%",
          };

    if (resolvedType === "video") {
      const videoElement = (
        <video
          style={commonStyle}
          controls={variant === "dialog"}
          muted={variant === "inline"}
          autoPlay={variant === "dialog"}
          playsInline
          preload="metadata"
          poster={poster}
          src={src}
        >
          Your browser does not support the video tag.
        </video>
      );

      // Add play button overlay for inline videos
      if (variant === "inline") {
        return (
          <div className="gw-media-inline-wrapper">
            {videoElement}
            <div className="gw-media-play-overlay">
              <div className="gw-media-play-icon">
                <svg
                  width={30}
                  height={30}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
          </div>
        );
      }

      return videoElement;
    }

    return (
      <img
        src={src}
        alt={alt}
        style={commonStyle}
        loading="lazy"
        aria-label={alt}
      />
    );
  };

  const dialog = !open
    ? null
    : createPortal(
        <div
          className="gw-media-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="gw-media-surface"
            role="dialog"
            aria-modal="true"
            aria-label={alt || "Media preview"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gw-media-action-bar">
              {showActions && (
                <>
                  <button
                    type="button"
                    className="gw-media-action-btn"
                    onClick={handleDownload}
                    aria-label="Download media"
                  >
                    <IconDownload size={16} />
                    <span>Download</span>
                  </button>
                  <button
                    type="button"
                    className="gw-media-action-btn"
                    onClick={handleCopyLink}
                    aria-label="Copy media link"
                  >
                    <IconCopy size={16} />
                    <span>{isCopied ? "Copied" : "Copy link"}</span>
                  </button>
                </>
              )}
              <button
                type="button"
                className="gw-media-icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close preview"
              >
                <IconClose size={16} />
              </button>
            </div>
            <div className="gw-media-content">{renderMedia("dialog")}</div>
          </div>
        </div>,
        document.body,
      );

  return (
    <>
      <style>{styleContent}</style>
      <button
        type="button"
        className="gw-media-inline-btn"
        onClick={() => setOpen(true)}
        aria-label={alt ? `Open media: ${alt}` : "Open media preview"}
      >
        {renderMedia("inline")}
      </button>
      {dialog}
    </>
  );
};

export default MediaPreview;

