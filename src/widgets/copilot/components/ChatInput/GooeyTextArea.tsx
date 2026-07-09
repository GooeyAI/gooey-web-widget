import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";

const DEFAULT_MIN_HEIGHT = 44;
const DEFAULT_MAX_HEIGHT = 200;

interface GooeyTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

const GooeyTextArea = ({
  value,
  onChange,
  onKeyDown,
  className,
  id,
  placeholder,
  autoFocus,
  minHeight = DEFAULT_MIN_HEIGHT,
  maxHeight = DEFAULT_MAX_HEIGHT,
  rows,
  style,
  ...rest
}: GooeyTextAreaProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = useCallback(
    (element: HTMLTextAreaElement) => {
      element.style.height = `${minHeight}px`;
      const nextHeight = Math.min(element.scrollHeight, maxHeight);
      element.style.height = `${Math.max(nextHeight, minHeight)}px`;
      element.style.overflowY =
        element.scrollHeight > maxHeight ? "auto" : "hidden";
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    if (!inputRef.current) return;
    adjustHeight(inputRef.current);
  }, [value, adjustHeight]);

  return (
    <textarea
      ref={inputRef}
      id={id}
      value={value}
      rows={rows}
      autoFocus={autoFocus}
      placeholder={placeholder}
      className={clsx(
        className,
        "br-large b-1 gpt-10 gpb-10 gpr-40 gpl-12 gooeyChat-chat-input-textarea"
      )}
      style={{
        boxSizing: "border-box",
        minWidth: 0,
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
        ...style,
      }}
      onChange={(e) => {
        if (!e) return;
        onChange?.(e);
        adjustHeight(e.target);
      }}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
};

export default GooeyTextArea;
