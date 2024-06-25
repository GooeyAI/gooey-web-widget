import clsx from "clsx";
import IconClose from "src/assets/SvgIcons/IconClose";
import Button from "src/components/shared/Buttons/Button";
import { CircularLoader } from "src/components/shared/Loaders";

const FilePreview = ({ files }: { files: Array<any> }) => {
  if (!files) return null;
  return (
    <div className="d-flex" style={{ gap: "12px", flexWrap: "wrap" }}>
      {files.map((file, index) => {
        const { isUploading, name, data, removeFile } = file;
        const fileURL = URL.createObjectURL(data);
        const fileType = file.type.split("/")[0];

        return (
          <div key={index} className="d-flex">
            {fileType === "image" ? (
              <div className={clsx("file-preview-box br-large pos-relative")}>
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
                    <CircularLoader size={32} />
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "-16px",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                >
                  <Button className="bg-white gp-4 b-1" onClick={removeFile}>
                    <IconClose size={12} />
                  </Button>
                </div>
                <div
                  className={clsx(
                    isUploading && "uploading-box",
                    "overflow-hidden file-preview-box"
                  )}
                >
                  <a href={fileURL} target="_blank">
                    <img
                      src={fileURL}
                      alt={`preview-${name}`}
                      className={"br-large b-1"}
                    />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <p>{file.name}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilePreview;
