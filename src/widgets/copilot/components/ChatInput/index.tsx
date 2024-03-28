import IconButton from "src/components/shared/Buttons/IconButton";
import "./chatInput.scss";
import { useRef, useState } from "react";

import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import CircleUP from "src/assets/SvgIcons/CircleUP";
import CircleStop from "src/assets/SvgIcons/CircleStop";

export const CHAT_INPUT_ID = "gooeyChat-input";
const INPUT_HEIGHT = 34;
const ChatInput = () => {
  const { config }: any = useSystemContext();
  const { initializeQuery, isSending, cancelApiCall }: any =
    useMessagesContext();
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const resetHeight = () => {
    const ele: HTMLElement | null = inputRef.current;
    ele!.style!.height = INPUT_HEIGHT + "px";
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    if(!value.trim().length) resetHeight();
    setValue(value);
  };

  const handlePressEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      if (isSending) return;
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

  const showSend = !!value.length || isSending;
  const { bot_profile, show_gooey_branding } = config;
  return (
    <div
      className={clsx(
        "gooeyChat-chat-input pr-8 pl-8",
        !show_gooey_branding && "pb-8"
      )}
    >
      {/* Typing area */}
      <div
        className="br-large text-left d-flex flex-col justify-start b-1"
        id="gooeyChat-input-container"
      >
        {/* In line input */}
        <div className="d-flex align-end pr-4 pl-4 pt-2 pb-4 flex-1">
          {/* Typing area */}
          {
            <textarea
              value={value}
              ref={inputRef}
              id={CHAT_INPUT_ID}
              onChange={handleInputChange}
              onKeyDown={handlePressEnter}
              className={clsx(
                "br-large font_16_500 bg-white pt-6 pb-4 pr-12 pl-12 flex-1",
                showSend ? "w-80" : "w-100"
              )}
              style={{ height: INPUT_HEIGHT + "px" }}
              placeholder={`Message ${bot_profile.title}`}
            />
          }

          {/* Send Actions */}
          <IconButton
            disabled={!isSending && value.trim().length === 0}
            onClick={isSending ? handleCancelSend : handleSendMessage}
          >
            {isSending ? <CircleStop size={20} /> : <CircleUP size={20} />}
          </IconButton>
        </div>
      </div>
      {/* Gooey Branding */}
      {!!show_gooey_branding && (
        <p
          className="font_10_500 pt-4 pb-4 text-darkGrey text-center"
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
