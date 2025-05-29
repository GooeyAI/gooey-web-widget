import IconButton from "src/components/shared/Buttons/IconButton";
import { useMemo, useRef, useState } from "react";

import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import CircleUP from "src/assets/SvgIcons/CircleUP";
import CircleStop from "src/assets/SvgIcons/CircleStop";
import IconMicrophone from "src/assets/SvgIcons/IconMicrophone";
import InlineAudioRecorder from "./InlineAudioRecorder";

import { addInlineStyle } from "src/addStyles";
import style from "./chatInput.scss?inline";
import IconPaperClip from "src/assets/SvgIcons/IconPaperClip";
import FilePreview from "./FilePreview";
import { uploadFileToGooey } from "src/api/file-upload";
import { RequestModel } from "src/contexts/MessagesContext";
import PlaceholderMessage from "../Messages/PlaceholderMessage";
addInlineStyle(style);

export const CHAT_INPUT_ID = "gooeyChat-input";
const INPUT_HEIGHT = 44;
const acceptedTypes = "image/*";

const makeFileBuffer = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
      resolve(blob);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const ChatInput = () => {
  const { config } = useSystemContext();
  const { messages, initializeQuery, isSending, cancelApiCall, isReceiving } =
    useMessagesContext();
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState<Array<any> | null>(null);

  const inputRef = useRef<null | HTMLElement>(null);

  const resetHeight = () => {
    const ele: HTMLElement | null = inputRef.current;
    ele!.style!.height = INPUT_HEIGHT + "px";
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setValue(value);
    if (!value) resetHeight();
  };

  const handlePressEnter = (e: any) => {
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
    let payload: RequestModel = {
      input_prompt: value.trim(),
    };
    if (files?.length) {
      payload.input_images = files.map((file) => file.gooeyUrl);
      setFiles([]);
    }
    initializeQuery?.(payload);
    setValue("");
    resetHeight();
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

  const onFileAdded = (e: any) => {
    const files = Array.from(e.target.files);
    if (!files || !files.length) return;
    setFiles(
      files.map((file: any, index: number) => {
        makeFileBuffer(file).then((blob) => {
          const toUpload = new File([blob as Blob], file.name);
          uploadFileToGooey(config!.apiUrl!, toUpload).then((url) => {
            setFiles((prev: any) => {
              if (!prev[index]) return prev; // if photo removed before upload completed
              prev[index].isUploading = false;
              prev[index].gooeyUrl = url;
              return [...prev];
            });
          });
        });

        return {
          name: file.name,
          type: file.type.split("/")[0],
          data: file,
          gooeyUrl: "",
          isUploading: true,
          removeFile: () => {
            setFiles((prev: any) => {
              prev.splice(index, 1);
              return [...prev];
            });
          },
        };
      }),
    );
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedTypes;
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
    <>
      {!messages?.size && !isSending && <PlaceholderMessage />}
      <div
        className={clsx(
          "gooeyChat-chat-input gpr-8 gpl-8 mw-760",
          !config.branding.showPoweredByGooey && "gpb-8",
        )}
      >
        {files && files.length > 0 && (
          <div className="gp-12 b-1 br-large gmb-12 gm-12">
            <FilePreview files={files} />
          </div>
        )}
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
                <IconButton
                  onClick={handleFileUpload}
                  variant="text-alt"
                  className="gp-4"
                >
                  <IconPaperClip size={18} />
                </IconButton>
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
        {!!config.branding.showPoweredByGooey && (
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
    </>
  );
};

export default ChatInput;
