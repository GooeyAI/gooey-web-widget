import clsx from "clsx";
import IconClose from "src/assets/SvgIcons/IconClose";
import IconFile from "src/assets/SvgIcons/IconFile";

import IconButton from "src/components/shared/Buttons/IconButton";
import { CircularLoader } from "src/components/shared/Loaders";
import { FullSourcePreview } from "../Messages/Sources";
import { useSystemContext } from "src/contexts/hooks";
import { SyntheticEvent } from "react";
import {
  extractFileDetails,
  isGoogleDocsEmbeddable,
  truncateMiddle,
} from "../Messages/helpers";

const FilePreview = ({
  files,
  onRemove,
}: {
  files: Array<any>;
  onRemove?: (id: string) => void;
}) => {
  if (!files) return null;
  const { layoutController } = useSystemContext();

  const openInSidebar = (file: any) => {
    layoutController?.toggleSecondaryDrawer?.(() => (
      <FullSourcePreview data={file} layoutController={layoutController} />
    ));
  };

  const handleFileClick = (file: any) => {
    const fileURL = file?.url || URL.createObjectURL(file?.data);
    if (isGoogleDocsEmbeddable(file?.data?.type || "")) {
      openInSidebar({ url: fileURL, title: file.name });
    } else if (
      file?.data?.type?.includes("json") ||
      file?.data?.type?.includes("image") || 
      file?.url
    ) {
      openInSidebar({
        url: fileURL,
        title: file.name,
        isImage: file?.data?.type?.includes("image"),
      });
    } else {
      window.open(fileURL, "_blank");
    }
  };

  return (
    <div
      className="d-flex overflow-scroll gooey-scroll-container"
      style={{ gap: "12px", flexWrap: "nowrap", scrollbarWidth: "thin" }}
    >
      {files.map((file, index) => {
        const { isUploading, data, url } = file;
        const fileURL = url || URL.createObjectURL(data);
        const fileType = file?.type?.split("/")[0] || "application";

        return (
          <div key={index}>
            {fileType === "image" ? (
              <ImagePreviewItem
                onRemove={() => {
                  layoutController?.toggleSecondaryDrawer?.(null);
                  onRemove?.(file?.id);
                }}
                fileURL={fileURL}
                onClick={() => handleFileClick(file)}
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
                onClick={() => handleFileClick(file)}
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

const ImagePreviewItem = ({
  onRemove,
  fileURL,
  isUploading,
  onClick,
  isRemovable,
}: {
  onRemove: () => void;
  fileURL: string;
  isUploading: boolean;
  onClick: (e: SyntheticEvent) => void;
  isRemovable: boolean;
}) => {
  return (
    <div
      className={clsx("file-preview-box br-large pos-relative cr-pointer")}
      onClick={onClick}
    >
      {isUploading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <span style={{ zIndex: 2 }}>
            <CircularLoader size={32} />
          </span>
        </div>
      )}
      {isRemovable && (
        <div
          style={{
            position: "absolute",
            top: "6px",
            right: "-16px",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <IconButton
            className="bg-white gp-4 b-1"
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
        <img src={fileURL} alt={`preview-${name}`} className={"br-large b-1"} />
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
        "b-1 gp-10 br-default pos-relative d-flex align-center cr-pointer",
      )}
      style={{ width: "200px" }}
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
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "4px",
            transform: "translate(-50%, -50%)",
            zIndex: 4,
          }}
        >
          <IconButton
            className="bg-white gp-2 b-1"
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
