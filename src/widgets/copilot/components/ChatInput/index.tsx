import IconButton from "src/components/shared/Buttons/IconButton";
import { useRef, useState } from "react";

import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import CircleUP from "src/assets/SvgIcons/CircleUP";
import CircleStop from "src/assets/SvgIcons/CircleStop";
import IconMicrophone from "src/assets/SvgIcons/IconMicrophone";
import InlineAudioRecorder from "./InlineAudioRecorder";

import { addInlineStyle } from "src/addStyles";
import style from "./chatInput.scss?inline";
addInlineStyle(style);

export const CHAT_INPUT_ID = "gooeyChat-input";
const INPUT_HEIGHT = 44;
const ChatInput = () => {
  const { config } = useSystemContext();
  const { initializeQuery, isSending, cancelApiCall, isReceiving }: any =
    useMessagesContext();
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<null | HTMLElement>(null);

  const resetHeight = () => {
    const ele: HTMLElement | null = inputRef.current;
    ele!.style!.height = INPUT_HEIGHT + "px";
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    if (!value.trim().length) resetHeight();
    setValue(value);
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
    ele!.style!.height = "";
    ele!.style!.height = ele!.scrollHeight - 2 + "px";
  };

  const handleSendMessage = () => {
    if (!value.trim()) return null;
    initializeQuery(value.trim());
    setValue("");
    resetHeight();
  };

  const handleCancelSend = () => {
    cancelApiCall();
  };

  const handleRecordClick = () => {
    setIsRecording(true);
  };

  const handleSendRecording = (blob: Blob) => {
    initializeQuery(blob, "audio");
    setIsRecording(false);
  };

  if (!config) return null;
  const showStop = isSending || isReceiving;
  return (
    <div
      className={clsx(
        "gooeyChat-chat-input gpr-8 gpl-8",
        !config.branding.showPoweredByGooey && "gpb-8"
      )}
    >
      {isRecording ? (
        <InlineAudioRecorder
          onSend={handleSendRecording}
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
              "br-large b-1 font_16_500 bg-white gpt-10 gpb-10 gpr-40 gpl-12 flex-1 gm-0"
            )}
            style={{ height: INPUT_HEIGHT + "px" }}
            placeholder={`Message ${config.branding.name || ""}`}
          ></textarea>

          {/* Record Button */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: 0,
              height: INPUT_HEIGHT + "px",
              cursor: "text",
            }}
            onClick={() => inputRef?.current?.focus()}
            className="d-flex justify-end align-center gpr-4"
          >
            {!showStop && config?.enableAudioMessage && !value && (
              <IconButton onClick={handleRecordClick} variant="text-alt">
                <IconMicrophone size={18} />
              </IconButton>
            )}
            {/* Send Actions */}
            {(!!value || !config?.enableAudioMessage || showStop) && (
              <IconButton
                disabled={!showStop && !isSending && value.trim().length === 0}
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
  );
};

export default ChatInput;
