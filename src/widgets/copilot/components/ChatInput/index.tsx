import IconButton from "src/components/shared/Buttons/IconButton";
import "./chatInput.scss";
import { useEffect, useRef, useState } from "react";

import AttachFilesButton from "./AttachFilesButton";
import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";

export const CHAT_INPUT_ID = "gooeyChat-input";

const ChatInput = () => {
  const { botProfile }: any = useSystemContext();
  const { initializeQuery }: any = useMessagesContext();
  const [value, setValue] = useState("");
  // const [file, setFile] = useState("");

  const [isExpanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e: any) => {
    if (isExpanded) setExpanded(false);
    const { value } = e.target;
    setValue(value);
  };

  const handleFocus = () => {
    setExpanded(false);
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

  const handleAttachClick = () => {
    const ele: HTMLElement | null = inputRef.current;
    setExpanded((prev) => {
      ele!.style.marginLeft = prev ? "0" : "6px";
      return !prev;
    });
    return null;
  };

  const showSend = !!value.length;
  useEffect(() => {
    const ele: HTMLElement | null = inputRef.current;
    if (!isExpanded) ele!.style.marginLeft = "0";
    if (showSend) ele!.style.marginRight = "0";
    else ele!.style.marginRight = "0";
  }, [showSend, isExpanded]);

  return (
    <div className="gooeyChat-chat-input pr-8 pl-8">
      {/* Typing area */}
      <div className="br-large text-left d-flex flex-col justify-start b-1" id='gooeyChat-input-container'>
        {/* In line input */}
        <div className="d-flex align-center justify-between pr-8 pl-8 flex-1">
          <AttachFilesButton
            open={isExpanded}
            onAttachClick={handleAttachClick}
          />

          {/* Typing area */}
          {
            <textarea
              value={value}
              ref={inputRef}
              id={CHAT_INPUT_ID}
              onInput={handleChangeLine}
              onChange={handleInputChange}
              onKeyDown={handlePressEnter}
              onFocus={handleFocus}
              className={clsx(
                "br-large font_16_500 bg-white p-12",
                showSend ? "w-80" : "w-100"
              )}
              placeholder={`Message ${botProfile.title}`}
            />
          }

          {/* Send Actions */}
          {showSend && (
            <IconButton
              data-tooltip={"Send"}
              onClick={handleSendMessage}
              className="hover-grow br-large pl-16 pr-16"
            >
              {"⬆"}
            </IconButton>
          )}
        </div>
      </div>
      {/* Blur Background - Mast head */}
      <p
        className="font_10_500 pt-4 pb-4 mr-12 text-darkGrey pr-12 text-center"
        style={{ fontSize: "8px" }}
      >
        Powered by {" "}
        <a
          href="https://gooey.ai/copilot/"
          target="_ablank"
          className="text-darkGrey text-underline"
        >
          Gooey.AI
        </a>
      </p>
    </div>
  );
};

export default ChatInput;
