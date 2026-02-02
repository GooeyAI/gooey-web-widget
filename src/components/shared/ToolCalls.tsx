import React, { useState } from "react";
import clsx from "clsx";
import { ToolCall } from "src/contexts/MessagesContext";

interface ToolCallsProps {
  toolCalls: ToolCall[];
  className?: string;
}

const extractArgumentSummary = (inputs: Record<string, any>): string | null => {
  const findFirstString = (obj: any, maxLength = 50): string | null => {
    if (typeof obj === "string") {
      return obj.length > maxLength ? obj.substring(0, maxLength) + "..." : obj;
    }
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = findFirstString(item, maxLength);
        if (result) return result;
      }
    }
    if (obj && typeof obj === "object") {
      for (const value of Object.values(obj)) {
        const result = findFirstString(value, maxLength);
        if (result) return result;
      }
    }
    return null;
  };

  if (!inputs || Object.keys(inputs).length === 0) {
    return null;
  }

  return findFirstString(inputs);
};

const ToolCallCard: React.FC<{ toolCall: ToolCall }> = ({ toolCall }) => {
  const { title, inputs, return_value, is_running, icon } = toolCall;
  const [isExpanded, setIsExpanded] = useState(false);

  const argumentSummary = extractArgumentSummary(inputs || {});

  return (
    <details
      open={isExpanded}
      onToggle={(e) => setIsExpanded((e.target as HTMLDetailsElement).open)}
      style={{
        backgroundColor: "transparent",
        border: "1px solid #e9ecef",
      }}
    >
      <style>{`
        .tool-call-summary::after {
          display: none !important;
        }
      `}</style>
        <summary
          className="tool-call-summary"
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            listStyle: "none",
          }}
        >
          {icon && (
            icon.startsWith('http') || icon.startsWith('/') ? (
              <img
                src={icon}
                alt=""
                style={{
                  width: "16px",
                  height: "16px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            ) : (
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{icon}</span>
            )
          )}
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
              flex: 1,
            }}
          >
            <span className="font_14_600">{title}</span>
            {argumentSummary && (
              <>
                <span className="font_14_600"> - </span>
                <span className="font_14_400 text-muted">{argumentSummary}</span>
              </>
            )}
            {is_running && (
              <span className="font_12_400 text-muted"> Running...</span>
            )}
          </div>
          <div
            className={clsx(
              "tool-status-indicator rounded-circle",
              is_running ? "bg-primary" : "bg-success"
            )}
            style={{
              width: "8px",
              height: "8px",
              animation: is_running ? "pulse 2s infinite" : "none",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontSize: "10px",
              color: "#6c757d",
              flexShrink: 0,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            ▼
          </div>
        </summary>

        <div style={{ padding: "8px 0" }}>
          {inputs && Object.keys(inputs).length > 0 && (
            <div className="mb-3">
              <div className="font_14_600 text-dark mb-2">Inputs</div>
              <div
                className="font_12_400"
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  padding: "12px",
                  borderRadius: "6px",
                  maxHeight: "200px",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.4",
                }}
              >
                {JSON.stringify(inputs, null, 2)}
              </div>
            </div>
          )}

          {!is_running && return_value && (
            <div>
              <div className="font_14_600 text-dark mb-2">Return value</div>
              <div
                className="font_12_400"
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  padding: "12px",
                  borderRadius: "6px",
                  maxHeight: "200px",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.4",
                }}
              >
                {typeof return_value === "string"
                  ? return_value
                  : JSON.stringify(return_value, null, 2)}
              </div>
            </div>
          )}
        </div>
      </details>
  );
};

const ToolCalls: React.FC<ToolCallsProps> = ({ toolCalls, className }) => {
  if (!toolCalls || toolCalls.length === 0) {
    return null;
  }

  return (
    <div className={clsx("tool-calls-container", className)}>
      {toolCalls.map((toolCall) => (
        <ToolCallCard key={String(toolCall.id)} toolCall={toolCall} />
      ))}
    </div>
  );
};

export default ToolCalls;