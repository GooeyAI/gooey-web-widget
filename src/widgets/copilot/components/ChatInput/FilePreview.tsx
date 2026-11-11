import clsx from "clsx";
import IconClose from "src/assets/SvgIcons/IconClose";
import IconFile from "src/assets/SvgIcons/IconFile";

import IconButton from "src/components/shared/Buttons/IconButton";
import { CircularLoader } from "src/components/shared/Loaders";
import MediaPreview from "src/components/shared/Response/MediaPreview";
import { addInlineStyle } from "src/addStyles";
import { FullSourcePreview } from "../Messages/Sources";
import { useSystemContext } from "src/contexts/hooks";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  extractFileDetails,
  isGoogleDocsEmbeddable,
  truncateMiddle,
} from "../Messages/helpers";
import style from "./chatInput.scss?inline";

addInlineStyle(style);

const filePreviewCloseClass = "file-preview-close bg-white gp-4 b-1 br-circle";

/**
 * One blob URL per attached file, held for as long as that file is on show.
 *
 * Minting a fresh URL on each render hands the `<img>` a new src every time,
 * and the browser answers by reloading and re-decoding the full-resolution
 * photo. In the composer that happens on every keystroke, which stalls the
 * next painted frame by well over a second for a phone-sized image.
 *
 * The URLs are made in an effect rather than during render. That is what keeps
 * StrictMode honest: its simulated unmount revokes them, and the re-run of the
 * first effect mints replacements and publishes them as state, so the `<img>`
 * is told its src just died. Minting during render cannot do that — the DOM
 * keeps the revoked URL and the browser paints a broken image, which for the
 * composer means the filename spilling out of an empty preview box.
 *
 * The cache is keyed by file id so that removing one attachment leaves the
 * others' URLs — and so their decoded pixels — untouched.
 */
function useObjectUrls(files: Array<any>): Record<string, string> {
  const cacheRef = useRef(new Map<string, string>());
  const [urls, setUrls] = useState<Record<string, string>>({});

  // An uploaded file carries its own `url`; only a locally picked one needs this.
  const localFiles = files.filter((file) => file?.id && file?.data && !file?.url);
  // ids are uuids, so a comma cannot appear inside one.
  const localIds = localFiles.map((file) => file.id).join(",");

  useEffect(() => {
    const cache = cacheRef.current;

    for (const file of localFiles) {
      if (!cache.has(file.id)) cache.set(file.id, URL.createObjectURL(file.data));
    }

    const live = new Set(localFiles.map((file) => file.id));
    for (const [id, url] of cache) {
      if (live.has(id)) continue;
      URL.revokeObjectURL(url);
      cache.delete(id);
    }

    setUrls(Object.fromEntries(cache));
    // `localFiles` is derived from `localIds`, which is what actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localIds]);

  useEffect(() => {
    const cache = cacheRef.current;
    return () => {
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  return urls;
}

const FilePreview = ({
  files,
  onRemove,
}: {
  files: Array<any>;
  onRemove?: (id: string) => void;
}) => {
  const { layoutController } = useSystemContext();
  const fileURLs = useObjectUrls(files || []);
  if (!files) return null;

  const openInSidebar = (file: any) => {
    layoutController?.toggleSecondaryDrawer?.(() => (
      <FullSourcePreview data={file} layoutController={layoutController} />
    ));
  };

  const handleFileClick = (file: any, fileURL?: string) => {
    if (!fileURL) return; // still waiting on this file's blob URL
    const mimeType = file?.data?.type || "";
    const fileKind = file?.type?.split("/")[0] || file?.type || "";
    const isImage = mimeType.includes("image") || fileKind === "image";
    const isVideo = mimeType.includes("video") || fileKind === "video";

    if (isImage || isVideo) return;

    if (isGoogleDocsEmbeddable(mimeType)) {
      openInSidebar({ url: fileURL, title: file.name });
    } else if (mimeType.includes("json") || file?.url) {
      openInSidebar({
        url: fileURL,
        title: file.name,
      });
    } else {
      window.open(fileURL, "_blank");
    }
  };

  return (
    <div className="d-flex overflow-scroll gooey-scroll-container file-preview-list">
      {files.map((file, index) => {
        const { isUploading, url } = file;
        const fileURL = url || fileURLs[file?.id];
        const fileType = file?.type?.split("/")[0] || file?.type || "application";

        return (
          <div key={file.id || file.url || index}>
            {fileType === "image" || fileType === "video" ? (
              <MediaPreviewItem
                onRemove={() => {
                  layoutController?.toggleSecondaryDrawer?.(null);
                  onRemove?.(file?.id);
                }}
                fileURL={fileURL}
                alt={file?.name || file?.title}
                mediaType={fileType === "video" ? "video" : "image"}
                showActions={!!url}
                isUploading={isUploading}
                isRemovable={!!onRemove}
              />
            ) : (
              <FilePreviewItem
                file={file}
                onRemove={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  layoutController?.toggleSecondaryDrawer?.(null);
                  onRemove?.(file?.id);
                }}
                onClick={() => handleFileClick(file, fileURL)}
                isUploading={isUploading}
                isRemovable={!!onRemove}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const MediaPreviewItem = ({
  onRemove,
  fileURL,
  alt,
  mediaType,
  showActions,
  isUploading,
  isRemovable,
}: {
  onRemove: () => void;
  fileURL?: string;
  alt?: string;
  mediaType: "image" | "video";
  showActions: boolean;
  isUploading: boolean;
  isRemovable: boolean;
}) => {
  return (
    <div className={clsx("file-preview-box br-large pos-relative")}>
      {isUploading && (
        <div className="file-preview-loader">
          <span className="file-preview-loader-inner">
            <CircularLoader size={32} />
          </span>
        </div>
      )}
      {isRemovable && (
        <div className="file-preview-remove">
          <IconButton
            className={filePreviewCloseClass}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
            }}
          >
            <IconClose size={12} />
          </IconButton>
        </div>
      )}
      <div
        className={clsx(
          isUploading && "uploading-box",
          "overflow-hidden file-preview-box",
        )}
      >
        {fileURL && (
          <MediaPreview
            src={fileURL}
            alt={alt}
            mediaType={mediaType}
            showActions={showActions}
            inlineClassName="br-large b-1"
          />
        )}
      </div>
    </div>
  );
};

export const FilePreviewItem = ({
  file,
  onRemove,
  onClick,
  isUploading,
  isRemovable,
}: {
  file: any;
  onRemove?: (e: SyntheticEvent) => void;
  onClick: (e: SyntheticEvent) => void;
  isUploading: boolean;
  isRemovable: boolean;
}) => {
  const { mainString, extension } = file?.name
    ? { mainString: file?.name, extension: file?.name?.split(".")[1] }
    : extractFileDetails(file?.title || file?.url || "");
  const [title] = (mainString || "").split(",");
  const fileName = file?.name ?file?.name?.split(".")[0] : title;
  const fileExtension = file?.name?.split(".")[1] || extension?.split(".")[1];
  // support both blob and direct urls

  return (
    <div
      className={clsx(
        "file-preview-item b-1 gp-10 br-default pos-relative d-flex align-center cr-pointer",
      )}
      onClick={onClick}
    >
      {isUploading && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          className="d-flex br-default align-center justify-center"
        >
          <CircularLoader size={32} />
        </div>
      )}
      {isRemovable && (
        <div className="file-preview-remove">
          <IconButton
            className={filePreviewCloseClass}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove?.(e);
            }}
          >
            <IconClose size={12} />
          </IconButton>
        </div>
      )}
      <IconFile size={24} style={{ minWidth: "fit-content" }} />
      {/* remove extension */}
      <div
        style={{
          width: "90%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <p
          className="font_14_500"
          style={{ width: "90%", textOverflow: "ellipsis" }}
        >
          {truncateMiddle(fileName, 20)}
        </p>
        <p className="font_12_400 text-muted">{fileExtension?.toUpperCase()}</p>
      </div>
    </div>
  );
};
export default FilePreview;
