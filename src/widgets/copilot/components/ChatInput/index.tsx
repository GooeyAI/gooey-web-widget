import IconButton from "src/components/shared/Buttons/IconButton";
import "./chatInput.scss";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import CircleUP from "src/assets/SvgIcons/CircleUP";
import CircleStop from "src/assets/SvgIcons/CircleStop";

export const CHAT_INPUT_ID = "gooeyChat-input";

const ChatInput = () => {
  const { config }: any = useSystemContext();
  const { initializeQuery, isSending, cancelApiCall }: any =
    useMessagesContext();
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setValue(value);
  };

  const handlePressEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeLine = (e: any) => {
    // increase height by 24px
    e.preventDefault();
    const ele: HTMLElement | null = inputRef.current;
    ele!.style.height = "";
    ele!.style!.height = ele!.scrollHeight - 2 + "px";
  };

  const handleSendMessage = () => {
    if (!value.trim()) return null;
    initializeQuery(value.trim());
    setValue("");
    const ele: HTMLElement | null = inputRef.current;
    ele!.style!.height = "44px";
  };

  const handleCancelSend = () => {
    cancelApiCall();
  };

  const showSend = !!value.length || isSending;
  useEffect(() => {
    const ele: HTMLElement | null = inputRef.current;
    if (showSend) ele!.style.marginRight = "0";
    else ele!.style.marginRight = "0";
  }, [showSend]);

  const { bot_profile, show_gooey_branding } = config;
  return (
    <div className={clsx("gooeyChat-chat-input pr-8 pl-8", !show_gooey_branding && 'pb-8')}>
      {/* Typing area */}
      <div
        className="br-large text-left d-flex flex-col justify-start b-1"
        id="gooeyChat-input-container"
      >
        {/* In line input */}
        <div className="d-flex align-center pr-8 pl-8 flex-1">
          {/* Typing area */}
          {
            <textarea
              value={value}
              ref={inputRef}
              id={CHAT_INPUT_ID}
              onInput={handleChangeLine}
              onChange={handleInputChange}
              onKeyDown={handlePressEnter}
              className={clsx(
                "br-large font_16_500 bg-white p-12 flex-1",
                showSend ? "w-80" : "w-100"
              )}
              placeholder={`Message ${bot_profile.title}`}
            />
          }

          {/* Send Actions */}
          {showSend && (
            <IconButton
              onClick={isSending ? handleCancelSend : handleSendMessage}
            >
              {isSending ? <CircleStop size={20} /> : <CircleUP size={20} />}
            </IconButton>
          )}
        </div>
      </div>
      {/* Blur Background - Mast head */}
      {!!show_gooey_branding && (
        <p
          className="font_10_500 pt-4 pb-4 mr-12 text-darkGrey pr-12 text-center"
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
