import clsx from "clsx";
import IconClose from "src/assets/SvgIcons/IconClose";
import IconFile from "src/assets/SvgIcons/IconFile";

import IconButton from "src/components/shared/Buttons/IconButton";
import { CircularLoader } from "src/components/shared/Loaders";
import { FullSourcePreview } from "../Messages/Sources";
import { useSystemContext } from "src/contexts/hooks";
import { SyntheticEvent } from "react";
import { isGoogleDocsEmbeddable, truncateMiddle } from "../Messages/helpers";

const FilePreview = ({
  files,
  isRemovable = false,
}: {
  files: Array<any>;
  isRemovable?: boolean;
}) => {
  if (!files) return null;
  const { layoutController } = useSystemContext();

  const openInSidebar = (file: any) => {
    layoutController?.toggleSecondaryDrawer?.(() => (
      <FullSourcePreview data={file} layoutController={layoutController} />
    ));
  };

  const handleFileClick = (file: any) => {
    if (isGoogleDocsEmbeddable(file?.data?.type)) {
      openInSidebar({ url: file.gooeyUrl, title: file.name });
    } else if (
      file?.data?.type?.includes("json") ||
      file?.data?.type?.includes("image")
    ) {
      openInSidebar({
        url: URL.createObjectURL(file.data),
        title: file.name,
        isImage: true,
      });
    } else {
      window.open(URL.createObjectURL(file.data), "_blank");
    }
  };

  return (
    <div
      className="d-flex overflow-scroll gooey-scroll-container"
      style={{ gap: "12px", flexWrap: "nowrap", scrollbarWidth: "thin" }}
    >
      {files.map((file, index) => {
        const { isUploading, data, removeFile } = file;
        const fileURL = URL.createObjectURL(data);
        const fileType = file.type.split("/")[0];

        return (
          <div key={index}>
            {fileType === "image" ? (
              <ImagePreviewItem
                removeFile={() => {
                  layoutController?.toggleSecondaryDrawer?.(null);
                  removeFile();
                }}
                fileURL={fileURL}
                onClick={() => handleFileClick(file)}
                isUploading={isUploading}
                isRemovable={isRemovable}
              />
            ) : (
              <FilePreviewItem
                file={file}
                removeFile={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  layoutController?.toggleSecondaryDrawer?.(null);
                  removeFile();
                }}
                onClick={() => handleFileClick(file)}
                isUploading={isUploading}
                isRemovable={isRemovable}
              />
            )}
          </div>
        );
      })}
      <div className="gooey-scroll-fade"></div>
    </div>
  );
};

const ImagePreviewItem = ({
  removeFile,
  fileURL,
  isUploading,
  onClick,
  isRemovable,
}: {
  removeFile: () => void;
  fileURL: string;
  isUploading: boolean;
  onClick: (e: any) => void;
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
              removeFile();
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
  removeFile = () => {},
  onClick,
  isUploading,
  isRemovable,
}: {
  file: any;
  removeFile?: (e: SyntheticEvent) => void;
  onClick: (e: SyntheticEvent) => void;
  isUploading: boolean;
  isRemovable: boolean;
}) => {
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
              removeFile(e);
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
          {truncateMiddle(file.name.split(".")[0], 20)}
        </p>
        <p className="font_12_400 text-muted">
          {file.name.split(".")[1].toUpperCase()}
        </p>
      </div>
    </div>
  );
};
export default FilePreview;
