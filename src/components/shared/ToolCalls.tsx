import clsx from "clsx";
import { useState } from "react";
import IconCaretUp from "src/assets/SvgIcons/IconCaretUp";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import SpinLoader from "./SpinLoader";

export interface ToolCall {
  id: string | number;
  label: string;
  run_url: string;
  inputs: Record<string, any>;
  return_value: any;
  is_running: boolean;
  icon?: string;
}

function ToolCalls({ final_prompt }: { final_prompt: any[] }) {
  let toolCalls = extractToolCallsFromFinalPrompt(final_prompt);

  if (!toolCalls || toolCalls.length === 0) {
    return null;
  }

  return (
    <div className={clsx("tool-calls-container", "mw-100")}>
      {toolCalls.map((toolCall) => (
        <ToolCallCard key={String(toolCall.id)} toolCall={toolCall} />
      ))}
    </div>
  );
}

function ToolCallCard({ toolCall }: { toolCall: ToolCall }) {
  const { label, inputs, return_value, is_running, icon, run_url } = toolCall;
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
          alignItems: "baseline",
          gap: "8px",
          listStyle: "none",
          marginBottom: "2px",
        }}
      >
        {is_running ? (
          <div style={{ height: "11px" }}>
            <SpinLoader size={13} />
          </div>
        ) : icon ? (
          icon.startsWith("http") || icon.startsWith("/") ? (
            <img
              src={icon}
              alt=""
              style={{
                width: "14px",
                height: "14px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          ) : (
            <span style={{ fontSize: "12px", flexShrink: 0 }}>{icon}</span>
          )
        ) : (
          <span style={{ fontSize: "12px", flexShrink: 0 }}>🛠️</span>
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
          <span className="font_12_600">{label}</span>
          {argumentSummary && (
            <>
              <span className="font_12_600"> - </span>
              <span className="font_12_400 text-muted">{argumentSummary}</span>
            </>
          )}
        </div>
        <div
          style={{
            color: "#6c757d",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isExpanded ? (
            <IconCaretUp size={10} />
          ) : (
            <IconChevronDown size={10} />
          )}
        </div>
      </summary>

      <div style={{ padding: "8px 0" }}>
        {inputs && Object.keys(inputs).length > 0 && (
          <div className="mb-3">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
                width: "100%",
              }}
            >
              <div className="font_12_600 text-dark">Inputs</div>
              {run_url && (
                <a
                  href={run_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "11px",
                    textDecoration: "none",
                    gap: "4px",
                    color: "#6c757d",
                    marginLeft: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  <IconExternalLink size={10} />
                  View Tool Call
                </a>
              )}
            </div>
            <div
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                fontSize: "10px",
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

        {!is_running && (
          <div>
            <div className="font_12_600 text-dark mb-2">Output</div>
            <div
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
                fontSize: "10px",
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
}

const extractArgumentSummary = (obj: any, maxLength = 50): string | null => {
  if (typeof obj === "string") {
    if (obj.length > maxLength) {
      obj = obj.substring(0, maxLength) + "...";
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = extractArgumentSummary(item, maxLength);
      if (result) return result;
    }
  }
  if (obj && typeof obj === "object") {
    for (const value of Object.values(obj)) {
      const result = extractArgumentSummary(value, maxLength);
      if (result) return result;
    }
  }
  return null;
};

function extractToolCallsFromFinalPrompt(final_prompt: any[]): ToolCall[] {
  let ret: Record<string, ToolCall> = {};
  for (let entry of final_prompt) {
    if (!entry) continue;
    for (let tc of entry.tool_calls || []) {
      let inputs;
      try {
        inputs = JSON.parse(tc.function.arguments);
      } catch (e) {
        inputs = tc.function.arguments;
      }
      ret[tc.id] = {
        id: tc.id,
        inputs: inputs,
        return_value: null,
        is_running: true,
        label: tc.label || tc.function.name || "",
        icon: tc.icon,
        run_url: "",
      };
    }
    if (entry.role === "tool") {
      let tc = ret[entry.tool_call_id];
      if (!tc) continue;
      try {
        tc.return_value = JSON.parse(entry.content);
      } catch (e) {
        tc.return_value = entry.content;
      }
      tc.is_running = false;
      tc.run_url = entry.run_url;
    }
  }
  return Object.values(ret);
}

export default ToolCalls;
