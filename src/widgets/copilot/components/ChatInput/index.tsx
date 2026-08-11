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
import { RequestModel } from "src/contexts/MessagesContext";
import PlaceholderMessage from "../Messages/PlaceholderMessage";
import GooeyTextArea from "./GooeyTextArea";
import { themeCapabilities } from "src/themes";
import { CHAT_INPUT_ID } from "../constants";
addInlineStyle(style);

const acceptedFileTypes = "application/*, text/*, audio/*";
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
  const {
    messages,
    initializeQuery,
    isSending,
    cancelApiCall,
    isReceiving,
    preAttachedFileUsed,
    setPreAttachedFileUsed,
  } = useMessagesContext();
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState<UploadedFile[] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);

  // Handle preAttachedFile on mount
  useEffect(() => {
    const input_images = config?.payload?.input_images || [];
    if (!input_images?.length || preAttachedFileUsed || files?.length) return;

    const newFiles = processFiles(
      input_images.map((image: any) => {
        if (typeof image === "string") return; // @TODO: support for CDN URLs
        // check if image is { name: string; mime: string; bytes: number[]; };
        const fileObj = new File(
          [new Uint8Array(image.bytes)],
          image.name || "gooey-image.png",
          { type: image.mime || "image/png" },
        );
        return fileObj;
      }),
    );
    setPreAttachedFileUsed?.(true);
    setFiles(newFiles as [UploadedFile]);
  }, [config?.payload?.input_images, preAttachedFileUsed]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const path = e.composedPath(); // get the path of the click event as we are in shadow DOM
      const isInsideTrigger =
        !!menuButtonRef.current && path.includes(menuButtonRef.current);
      const isInsideMenu = path.some(
        (node) =>
          node instanceof Element && node.classList.contains("gooey-modal"),
      );
      if (isInsideTrigger || isInsideMenu) return;
      setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      if (isSending || isReceiving) return;
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if ((!value.trim() && !files?.length) || disableSend) return null;
    let payload: RequestModel = {
      input_prompt: value.trim(),
    };
    if (files?.length) {
      const documents = files.filter(
        (file) => file.type === "application" || file.type === "text",
      );
      const images = files.filter((file) => file.type === "image");
      const videos = files.filter((file) => file.type === "video");
      const audios = files.filter((file) => file.type === "audio");

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
      if (audios.length) payload.input_audio = audios[0].gooeyUrl;
      setFiles([]);
    }
    initializeQuery?.(payload);
    setValue("");
  };

  const handleCancelSend = () => {
    cancelApiCall?.();
  };

  const handleRecordClick = () => {
    setIsRecording(true);
  };

  const handleSendAudio = (blob: Blob) => {
    initializeQuery?.({ input_audio: blob });
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
  const theme = themeCapabilities(config.theme);
  const showStop = isSending || isReceiving;
  const disableSend =
    (!showStop && !isSending && value.trim().length === 0 && !files?.length) ||
    files?.some((file) => file.isUploading);
  const isLeftButtons = useMemo(
    () => config?.enablePhotoUpload,
    [config?.enablePhotoUpload],
  );
  return (
    <div
      className={clsx(
        !config.branding.showPoweredByGooey && "gpb-8",
        !messages?.size && !isSending && "gooey-chat-input-empty",
        "gooeyChat-chat-input w-100 gpl-8 gpr-8 mw-760 gpt-8",
      )}
    >
      {!messages?.size && !isSending && <PlaceholderMessage />}
      {files && files.length > 0 && (
        <div className="gp-12 b-1 br-large gmb-12 gm-12">
          <FilePreview files={files} onRemove={handleRemoveFile} />
        </div>
      )}
      {isRecording ? (
        <InlineAudioRecorder
          onSend={handleSendAudio}
          onCancel={() => setIsRecording(false)}
        />
      ) : (
        <div className="gooey-chat-input-bar pos-relative d-flex">
          {/* Left icons */}
          {isLeftButtons && (
            <div className="input-left-buttons pos-relative br-large d-flex">
              <GooeyPopper
                showModal={isMenuOpen}
                direction={{ x: "left", y: "top" }}
                ModalContent={() => (
                  <div className="gp-8">
                    <Button
                      className="gooey-file-menu-button w-100 text-left"
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
                <div ref={menuButtonRef}>
                  <IconButton
                    onClick={() => setIsMenuOpen((v) => !v)}
                    variant="text-alt"
                    isPressed={isMenuOpen}
                    className={clsx(
                      "gooey-input-control",
                      isMenuOpen && "depressed",
                    )}
                  >
                    <IconPlus size={18} />
                  </IconButton>
                </div>
              </GooeyPopper>
            </div>
          )}

          {/* Typing area */}
          <GooeyTextArea
            value={value}
            id={CHAT_INPUT_ID}
            minHeight={theme.inputMinHeight}
            onChange={(e) => setValue(e?.target?.value)}
            onKeyDown={handlePressEnter}
            className={clsx("font_16_500 gm-0")}
            placeholder={
              config?.branding.inputPlaceholderText ||
              `Message ${config?.branding.title || ""}`
            }
          />

          {/* Right icons */}
          <div className="input-right-buttons">
            {!files?.length &&
              !showStop &&
              config?.enableAudioMessage &&
              !value && (
                <IconButton
                  aria-label="Record audio"
                  className="gooey-input-control"
                  onClick={handleRecordClick}
                  variant="text-alt"
                >
                  <IconMicrophone size={18} />
                </IconButton>
              )}
            {/* Send Actions */}
            {(!!value ||
              theme.alwaysShowSendButton ||
              !config?.enableAudioMessage ||
              showStop ||
              !!files?.length) && (
              <IconButton
                disabled={disableSend}
                variant="text-alt"
                className="gooey-input-control gooey-send-button"
                onClick={showStop ? handleCancelSend : handleSendMessage}
              >
                {showStop ? <CircleStop size={24} /> : <CircleUP size={24} />}
              </IconButton>
            )}
          </div>
        </div>
      )}
      {/* Gooey Branding */}
      {!!config.branding.showPoweredByGooey && (
        <p className="gooey-powered-by font_10_500 gpt-4 gpb-6 text-darkGrey text-center gm-0">
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
  );
};

export default ChatInput;
