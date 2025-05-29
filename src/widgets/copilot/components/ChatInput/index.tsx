import IconButton from "src/components/shared/Buttons/IconButton";
import React, { useMemo, useRef, useState, useEffect } from "react";

import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import CircleUP from "src/assets/SvgIcons/CircleUP";
import CircleStop from "src/assets/SvgIcons/CircleStop";
import IconMicrophone from "src/assets/SvgIcons/IconMicrophone";
import InlineAudioRecorder from "./InlineAudioRecorder";

import { addInlineStyle } from "src/addStyles";
import style from "./chatInput.scss?inline";
import FilePreview from "./FilePreview";
import { uploadFileToGooey } from "src/api/file-upload";
import IconPlus from "src/assets/SvgIcons/IconPlus";
import GooeyPopper from "src/components/shared/Popper/Popper";
import Button from "src/components/shared/Buttons/Button";
import IconFile from "src/assets/SvgIcons/IconFile";
import IconImage from "src/assets/SvgIcons/IconImage";
import { v4 as uuidv4 } from "uuid";
import { isMobile } from "../Messages/helpers";
import IconCamera from "src/assets/SvgIcons/IconCamera";
addInlineStyle(style);

export const CHAT_INPUT_ID = "gooeyChat-input";
const INPUT_HEIGHT = 44;
const acceptedFileTypes =
  "application/*, text/*, application/pdf, text/plain, application/json, text/json, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.presentationml.presentation";
const acceptedImageTypes = "image/*, video/*,";

// Define a type for file state
interface UploadedFile {
  id: string;
  name: string;
  type: string;
  data: File;
  gooeyUrl: string;
  isUploading: boolean;
}

const ChatInput = () => {
  const { config } = useSystemContext();
  const { initializeQuery, isSending, cancelApiCall, isReceiving }: any =
    useMessagesContext();
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState<UploadedFile[] | null>(null);
  const [preAttachedFileUsed, setPreAttachedFileUsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);

  const inputRef = useRef<null | HTMLElement>(null);

  // Handle preAttachedFile on mount
  useEffect(() => {
    const input_images = config?.payload?.input_images || [];
    if (!input_images?.length || preAttachedFileUsed || files?.length) return;

    input_images.forEach((image: any) => {
      if (typeof image === "string") return; // @TODO: support for CDN URLs
      // check if image is { name: string; mime: string; bytes: number[]; };
      if (typeof image === "object" && image.bytes) {
        const fileObj = new File(
          [new Uint8Array(image.bytes)],
          image.name || "gooey-image.png",
          { type: image.mime || "image/png" },
        );
        const newFiles = processFiles([fileObj]).filter((f: any) => !!f);
        setFiles((prev: any) => (prev ? [...prev, ...newFiles] : newFiles));
        setPreAttachedFileUsed(true);
      }
    });
  }, [config?.payload?.input_images, preAttachedFileUsed]);

  // Dismiss menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  const resetHeight = () => {
    const ele: HTMLElement | null = inputRef.current;
    ele!.style!.height = INPUT_HEIGHT + "px";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    if (!value) resetHeight();
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      if (isSending || isReceiving) return;
      e.preventDefault();
      handleSendMessage();
    } else if (e.keyCode === 13 && e.shiftKey) {
      handleChangeLine();
    }
  };

  const handleChangeLine = () => {
    // increase height by 24px
    const ele: HTMLElement | null = inputRef.current;
    if (ele!.scrollHeight > INPUT_HEIGHT)
      ele?.setAttribute(
        "style",
        "height:" + ele.scrollHeight + "px !important",
      );
  };

  const handleSendMessage = () => {
    if ((!value.trim() && !files?.length) || disableSend) return null;
    const payload: any = {
      input_prompt: value.trim(),
    };
    if (files?.length) {
      const documents = files.filter(
        (file) => file.type === "application" || file.type === "text",
      );
      const images = files.filter((file) => file.type === "image");
      const videos = files.filter((file) => file.type === "video");

      // attach to payload for server to process
      if (documents.length)
        payload.input_documents = documents.map((file) => file.gooeyUrl);
      if (images.length)
        payload.input_images = images.map((file) => file.gooeyUrl);
      if (videos.length)
        payload.input_documents = [
          ...(payload.input_documents || []),
          ...videos.map((file) => file.gooeyUrl),
        ];
      payload.attached_files = files ? [...files] : [];
      setFiles([]);
    }
    initializeQuery(payload);
    setValue("");
    resetHeight();
  };

  const handleCancelSend = () => {
    cancelApiCall();
  };

  const handleRecordClick = () => {
    setIsRecording(true);
  };

  const handleSendAudio = (blob: Blob) => {
    initializeQuery({ input_audio: blob });
    setIsRecording(false);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev: any) => prev.filter((f: any) => f.id !== id));
  };

  const processFiles = (files: Array<any>): Array<UploadedFile | undefined> => {
    if (!files || !files.length) return [];
    return files.map((file: any) => {
      const id = uuidv4();
      try {
        if (!config || !config.apiUrl) return;
        uploadFileToGooey(config.apiUrl, file).then((url) => {
          setFiles((prev: any) => {
            const idx = prev.findIndex((f: any) => f.id === id);
            if (idx === -1) return prev; // if photo removed before upload completed
            // @TODO: cancel upload if file removed
            const updated = [...prev];
            updated[idx] = {
              ...updated[idx],
              isUploading: false,
              gooeyUrl: url,
            };
            return updated;
          });
        });
      } catch (err) {
        console.error(err);
        setFiles((prev: any) => prev.filter((f: any) => f.id !== id));
        // TODO: show error toast
      }

      return {
        id,
        name: file.name,
        type: file.type.split("/")[0],
        data: file,
        gooeyUrl: "",
        isUploading: true,
      } as UploadedFile;
    });
  };

  const onFileAdded = (e: any) => {
    const files = Array.from(e.target.files);
    if (!files || !files.length) return;
    setFiles((prev: any) =>
      prev ? [...prev, ...processFiles(files)] : processFiles(files),
    );
  };

  const handleFileMenuClick = () => {
    setIsMenuOpen(false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedFileTypes;
    input.onchange = onFileAdded;
    input.multiple = true;
    input.click();
  };

  const handlePhotoMenuClick = () => {
    setIsMenuOpen(false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedImageTypes;
    input.onchange = onFileAdded;
    input.multiple = true;
    input.click();
  };

  const handleTakePhotoClick = () => {
    setIsMenuOpen(false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedImageTypes;
    input.capture = "environment"; // opens camera directly on mobile
    input.onchange = onFileAdded;
    input.click();
  };

  if (!config) return null;
  const showStop = isSending || isReceiving;
  const disableSend =
    (!showStop && !isSending && value.trim().length === 0 && !files?.length) ||
    files?.some((file) => file.isUploading);
  const isLeftButtons = useMemo(
    () => config?.enablePhotoUpload,
    [config?.enablePhotoUpload],
  );
  return (
    <React.Fragment>
      {files && files.length > 0 && (
        <div className="gp-12 b-1 br-large gmb-12 gm-12">
          <FilePreview files={files} onRemove={handleRemoveFile} />
        </div>
      )}
      <div
        className={clsx(
          "gooeyChat-chat-input gpr-8 gpl-8",
          !config.branding.showPoweredByGooey && "gpb-8",
        )}
      >
        {isRecording ? (
          <InlineAudioRecorder
            onSend={handleSendAudio}
            onCancel={() => setIsRecording(false)}
          />
        ) : (
          <div className="pos-relative">
            {/* Typing area */}
            <textarea
              value={value}
              ref={inputRef as any}
              id={CHAT_INPUT_ID}
              onChange={handleInputChange}
              onKeyDown={handlePressEnter}
              className={clsx(
                "br-large b-1 font_16_500 bg-white gpt-10 gpb-10 gpr-40 flex-1 gm-0",
                isLeftButtons ? "gpl-32" : "gpl-12",
              )}
              placeholder={`Message ${config.branding.name || ""}`}
            ></textarea>

            {/* Left icons */}
            {isLeftButtons && (
              <div className="input-left-buttons">
                <GooeyPopper
                  showModal={isMenuOpen}
                  direction={{ x: "left", y: "top" }}
                  ModalContent={() => (
                    <div className="gp-8">
                      <Button
                        className="w-100 text-left"
                        style={{ minWidth: "100px" }}
                        variant="text-alt"
                        onClick={handleFileMenuClick}
                        LeftIconComponent={() => <IconFile size={16} />}
                      >
                        <p className="font_14_500">File</p>
                      </Button>
                      <Button
                        className="w-100 text-left"
                        variant="text-alt"
                        onClick={handlePhotoMenuClick}
                        LeftIconComponent={() => <IconImage size={16} />}
                      >
                        <p className="font_14_500">Image or Video </p>
                      </Button>
                      {isMobile() && (
                        <Button
                          className="w-100 text-left"
                          variant="text-alt"
                          onClick={handleTakePhotoClick}
                          LeftIconComponent={() => <IconCamera size={16} />}
                        >
                          <p className="font_14_500">Take Photo</p>
                        </Button>
                      )}
                    </div>
                  )}
                >
                  <div ref={menuButtonRef} style={{ display: "inline-block" }}>
                    <IconButton
                      onClick={() => setIsMenuOpen((v) => !v)}
                      variant="text-alt"
                      isPressed={isMenuOpen}
                      className={clsx("gp-4", isMenuOpen && "depressed")}
                    >
                      <IconPlus size={18} />
                    </IconButton>
                  </div>
                </GooeyPopper>
              </div>
            )}

            {/* Right icons */}
            <div className="input-right-buttons">
              {!files?.length &&
                !showStop &&
                config?.enableAudioMessage &&
                !value && (
                  <IconButton onClick={handleRecordClick} variant="text-alt">
                    <IconMicrophone size={18} />
                  </IconButton>
                )}
              {/* Send Actions */}
              {(!!value ||
                !config?.enableAudioMessage ||
                showStop ||
                !!files?.length) && (
                <IconButton
                  disabled={disableSend}
                  variant="text-alt"
                  className="gp-4"
                  onClick={showStop ? handleCancelSend : handleSendMessage}
                >
                  {showStop ? <CircleStop size={24} /> : <CircleUP size={24} />}
                </IconButton>
              )}
            </div>
          </div>
        )}

        {/* Gooey Branding */}
        {!!config.branding.showPoweredByGooey && !isRecording && (
          <p
            className="font_10_500 gpt-4 gpb-6 text-darkGrey text-center gm-0"
            style={{ fontSize: "8px" }}
          >
            Powered by{" "}
            <a
              href="https://gooey.ai/copilot/"
              target="_ablank"
              className="text-darkGrey text-underline"
            >
              Gooey.AI
            </a>
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default ChatInput;
