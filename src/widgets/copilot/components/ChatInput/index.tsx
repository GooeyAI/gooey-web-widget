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
import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
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
import { useFilePicker } from "./useFilePicker";
addInlineStyle(style);

const acceptedFileTypes = "application/*,text/*,audio/*";
const acceptedImageTypes = "image/*,video/*";

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
    handleNewConversation,
    preAttachedFileUsed,
    setPreAttachedFileUsed,
  } = useMessagesContext();
  const [value, setValue] = useState("");
  // The composer floats over the message list, so the list has to know how tall
  // it is to keep the last message clear of it. Published as a custom property
  // on the chat pane rather than passed down: the message list is a sibling, and
  // the height changes on its own (a growing textarea, an attachment tray).
  const rootRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState<UploadedFile[] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    const pane = el?.closest<HTMLElement>(".gooey-chat-main");
    if (!el || !pane) return;
    const publish = () => {
      // How far the list must pad itself to scroll a message clear of the
      // composer.
      pane.style.setProperty("--gooey-composer-height", `${el.offsetHeight}px`);
      // Where the list's fade bottoms out, and what the scroll-to-bottom control
      // clears - both measured against the input bar rather than the wrapper,
      // whose padding is empty. Falls back to the wrapper while the bar is
      // swapped out, as it is during recording.
      const bar = el.querySelector<HTMLElement>(".gooey-chat-input-bar") ?? el;
      const paneBottom = pane.getBoundingClientRect().bottom;
      const barRect = bar.getBoundingClientRect();
      // The controls are nudged up out of the bar's box (see `.input-left-
      // buttons`), so the hidden band starts at the highest of them, not the bar.
      const controlsTop = Math.min(
        barRect.top,
        ...Array.from(bar.children, (c) => c.getBoundingClientRect().top),
      );
      const set = (name: string, value: number) =>
        pane.style.setProperty(name, `${Math.max(0, Math.round(value))}px`);
      set("--gooey-composer-solid", paneBottom - controlsTop);
      set("--gooey-composer-center", paneBottom - (barRect.top + barRect.height / 2));
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      pane.style.removeProperty("--gooey-composer-height");
      pane.style.removeProperty("--gooey-composer-solid");
      pane.style.removeProperty("--gooey-composer-center");
    };
  }, []);

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
        uploadFileToGooey(config.apiUrl, file)
          .then((url) => {
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
          })
          .catch((err) => {
            console.error(err);
            setFiles((prev: any) =>
              (prev || []).filter((f: any) => f.id !== id),
            );
            // TODO: show error toast
          });
      } catch (err) {
        console.error(err);
        setFiles((prev: any) => (prev || []).filter((f: any) => f.id !== id));
        // TODO: show error toast
      }

      return {
        id,
        name: file.name,
        type: (file.type || "application/octet-stream").split("/")[0],
        data: file,
        gooeyUrl: "",
        isUploading: true,
      } as UploadedFile;
    });
  };

  const handleFilesAdded = (selected: File[]) => {
    if (!selected.length) return;
    const added = processFiles(selected);
    setFiles((prev: any) => (prev ? [...added, ...prev] : added));
  };

  const openFilePicker = useFilePicker(
    { accept: acceptedFileTypes, multiple: true },
    handleFilesAdded,
  );
  const openPhotoPicker = useFilePicker(
    { accept: acceptedImageTypes, multiple: true },
    handleFilesAdded,
  );
  const openCameraPicker = useFilePicker(
    { accept: acceptedImageTypes, capture: "environment" },
    handleFilesAdded,
  );

  const handleFileMenuClick = () => {
    setIsMenuOpen(false);
    openFilePicker();
  };

  const handlePhotoMenuClick = () => {
    setIsMenuOpen(false);
    openPhotoPicker();
  };

  const handleTakePhotoClick = () => {
    setIsMenuOpen(false);
    openCameraPicker();
  };

  if (!config) return null;
  const theme = themeCapabilities(config.theme);
  const showFloatingNewChat =
    !!messages?.size &&
    (theme.floatingNewChat === "always" ||
      (theme.floatingNewChat === "when-chrome-hidden" &&
        config.showHeader === false));
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
      ref={rootRef}
      className={clsx(
        !config.branding.showPoweredByGooey && "gpb-8",
        !messages?.size && !isSending && "gooey-chat-input-empty",
        "gooeyChat-chat-input w-100 gpl-8 gpr-8 mw-760 gpt-8",
      )}
    >
      {showFloatingNewChat && (
        <IconButton
          aria-label="New chat"
          className="gooey-floating-new-chat-button"
          onClick={handleNewConversation}
          variant="text-alt"
        >
          <IconPencilEdit size={22} />
        </IconButton>
      )}
      {!messages?.size && !isSending && <PlaceholderMessage />}
      {files && files.length > 0 && (
        <div className="gooey-file-preview-tray gp-12 b-1 br-large gmb-12 gm-12">
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
            <div className="input-left-buttons pos-relative br-circle d-flex">
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
