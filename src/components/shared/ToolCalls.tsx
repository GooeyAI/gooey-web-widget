import clsx from "clsx";
import { useState } from "react";
import { addInlineStyle } from "src/addStyles";
import IconCaretUp from "src/assets/SvgIcons/IconCaretUp";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import style from "./toolCalls.scss?inline";

addInlineStyle(style);

export interface ToolCall {
  id: string | number;
  name: string;
  label: string;
  run_url: string;
  inputs: Record<string, any>;
  return_value: any;
  is_running: boolean;
  icon?: string;
}

// Housekeeping the agent does on its own behalf, not what a reader means by
// "a tool the bot used". Neither counted nor listed.
export const UNCOUNTED_TOOL_NAMES = ["load_tools"];

const QUERY_KEYS = ["search_query", "query", "q", "search_term", "keywords"];

// A one-line hint of what a call was about — its search query where there is
// one, so four search rows read as four different searches instead of the same
// tool name four times.
function getSnippet({ name, label, inputs }: ToolCall): string {
  if (!inputs || typeof inputs !== "object") return "";
  const strings = Object.entries(inputs).filter(
    (entry): entry is [string, string] =>
      typeof entry[1] === "string" && !!entry[1].trim(),
  );
  const byKey = QUERY_KEYS.map((key) =>
    strings.find(([k]) => k.toLowerCase() === key),
  ).find(Boolean);
  const fallback = /search/i.test(`${name} ${label}`) ? strings[0] : undefined;
  return (byKey || fallback)?.[1].replace(/\s+/g, " ").trim() ?? "";
}

/**
 * "Used N tools", and the calls themselves once it is opened. Collapsed by
 * default: on a run with any real tool use the calls outweigh the answer, and
 * the answer is what the reader came for.
 */
function ToolCalls({ toolCalls }: { toolCalls: ToolCall[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!toolCalls.length) return null;

  return (
    <div className={clsx("tool-calls-container gmb-12 mw-100")}>
      <button
        type="button"
        className="tool-calls-summary font_12_600 text-muted gap-6 gp-0"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((value) => !value)}
      >
        Used {toolCalls.length} {toolCalls.length === 1 ? "tool" : "tools"}
        <span className="d-flex align-center" aria-hidden="true">
          {isExpanded ? (
            <IconCaretUp size={10} />
          ) : (
            <IconChevronDown size={10} />
          )}
        </span>
      </button>
      {isExpanded &&
        toolCalls.map((toolCall) => (
          <ToolCallCard key={String(toolCall.id)} toolCall={toolCall} />
        ))}
    </div>
  );
}

function ToolCallCard({ toolCall }: { toolCall: ToolCall }) {
  const { label, inputs, return_value, is_running, icon, run_url } = toolCall;
  const [isExpanded, setIsExpanded] = useState(false);

  const snippet = getSnippet(toolCall);
  const hasInputs = !!inputs && Object.keys(inputs).length > 0;

  return (
    <details
      open={isExpanded}
      onToggle={(e) => setIsExpanded((e.target as HTMLDetailsElement).open)}
      className="tool-call-card"
    >
      <summary>
        <div className="tool-call-icon">
          {is_running ? (
            <div className="tool-call-loader" />
          ) : icon && (icon.startsWith("http") || icon.startsWith("/")) ? (
            <img src={icon} alt="" className="tool-call-icon-image" />
          ) : (
            <span className="tool-call-icon-emoji">{icon || "🛠️"}</span>
          )}
        </div>
        <div className="tool-call-summary-content">
          <span className="font_12_600">{label}</span>
          {snippet && (
            <>
              <span className="font_12_600"> - </span>
              <span className="font_12_400 text-muted">{snippet}</span>
            </>
          )}
        </div>
        <div className="tool-call-summary-toggle">
          {isExpanded ? (
            <IconCaretUp size={10} />
          ) : (
            <IconChevronDown size={10} />
          )}
        </div>
      </summary>

      {/* Built only once this card is opened. A <details> renders its children
          either way and lets the browser hide them, so opening the list laid
          out every call's inputs and output, not just the one clicked. */}
      {isExpanded && (
        <div className="tool-call-body">
          {hasInputs && (
            <div className="mb-3">
              <div className="tool-call-section-header">
                <div className="font_12_600 text-dark">Inputs</div>
                {run_url && (
                  <a
                    href={run_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-call-link"
                  >
                    <IconExternalLink size={10} />
                    View Tool Call
                  </a>
                )}
              </div>
              <div className="tool-call-json-block">
                {JSON.stringify(inputs, null, 2)}
              </div>
            </div>
          )}

          {!is_running && (
            <div>
              <div className="font_12_600 text-dark gmt-6 gmb-6">Output</div>
              <div className="tool-call-json-block">
                {typeof return_value === "string"
                  ? return_value
                  : JSON.stringify(return_value, null, 2)}
              </div>
            </div>
          )}
        </div>
      )}
    </details>
  );
}

export function extractToolCallsFromFinalPrompt(
  final_prompt: any[],
): ToolCall[] {
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
        name: tc.function.name || "",
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
