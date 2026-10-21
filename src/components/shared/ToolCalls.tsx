import clsx from "clsx";
import { type ReactNode, useState } from "react";
import { addInlineStyle } from "src/addStyles";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import { ToolCallIcon } from "./ToolCallIcon";
import { ToolValue } from "./ToolValue";
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

// Tools that never count towards "Used N tools" and are not listed in its table
export const UNCOUNTED_TOOL_NAMES = ["load_tools"];

const QUERY_KEYS = ["search_query", "query", "q", "search_term", "keywords"];

// A short, single-line hint of what the call was about (e.g. a search query)
function getSnippet({ name, label, inputs }: ToolCall): string {
  if (!inputs || typeof inputs !== "object") return "";
  const values = Object.entries(inputs).filter(
    (entry): entry is [string, string] =>
      typeof entry[1] === "string" && !!entry[1].trim(),
  );
  const byKey = QUERY_KEYS.map((key) =>
    values.find(([k]) => k.toLowerCase() === key),
  ).find(Boolean);
  const fallback = /search/i.test(`${name} ${label}`) ? values[0] : undefined;
  return (byKey || fallback)?.[1].replace(/\s+/g, " ").trim() ?? "";
}

// The "Used N tools" summary. It shows as soon as a tool is used, and counts a tool that
// is still running. `lead` (the thinking line) shares the summary's row:
//   [bot] Thinking…  ·  Used 2 tools ⌄
// and the table opens below that row.
function ToolCalls({
  toolCalls,
  lead,
}: {
  toolCalls: ToolCall[];
  lead?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (!toolCalls.length) return <>{lead}</>;

  return (
    <div className={clsx("tool-calls-container", "mw-100", !lead && "gmb-12")}>
      <div className="tool-calls-header">
        {lead}
        {lead && <span className="tool-calls-separator">·</span>}
        <button
          type="button"
          className="tool-calls-summary"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          Used {toolCalls.length} {toolCalls.length === 1 ? "tool" : "tools"}
          <ToolCallsChevron size={11} />
        </button>
      </div>
      {open && (
        <div className="tool-calls-table">
          {toolCalls.map((toolCall) => (
            <ToolCallRow key={String(toolCall.id)} toolCall={toolCall} />
          ))}
        </div>
      )}
    </div>
  );
}

function ToolCallRow({ toolCall }: { toolCall: ToolCall }) {
  const { name, label, inputs, return_value, run_url, icon, is_running } =
    toolCall;
  const [open, setOpen] = useState(false);
  const hasInputs = !!inputs && Object.keys(inputs).length > 0;
  const snippet = getSnippet(toolCall);

  // a running call with no inputs has nothing to show yet, so it isn't expandable
  if (is_running && !hasInputs) {
    return (
      <div className="tool-call-row">
        <div className="tool-call-row-summary is-static">
          <ToolCallIcon name={name} icon={icon} />
          <span className="tool-call-row-label">{label}</span>
          {snippet && <span className="tool-call-row-snippet">{snippet}</span>}
          <span className="tool-call-running">Running…</span>
        </div>
      </div>
    );
  }

  return (
    // `open` tracks the element's own state so the body is built only once the
    // row is opened. A <details> renders its children either way and lets the
    // browser hide them, which meant opening the table laid out every tool's
    // inputs and outputs, not just the one that was clicked.
    <details
      className="tool-call-row"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="tool-call-row-summary">
        <ToolCallIcon name={name} icon={icon} />
        <span className="tool-call-row-label">{label}</span>
        {snippet && <span className="tool-call-row-snippet">{snippet}</span>}
        {is_running && <span className="tool-call-running">Running…</span>}
        <ToolCallsChevron size={10} />
      </summary>

      {open && (
        <div className="tool-call-row-body">
          {hasInputs && (
            <>
              <div className="tool-call-section-header">
                <span>Inputs</span>
                {run_url && (
                  <a
                    href={run_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-call-link"
                  >
                    View tool call
                    <IconExternalLink size={9} />
                  </a>
                )}
              </div>
              <div className="tool-call-value">
                <ToolValue value={inputs} />
              </div>
            </>
          )}
          <div className="tool-call-section-header">Output</div>
          <div className="tool-call-value">
            {is_running ? (
              <span className="tool-value-muted">Running…</span>
            ) : (
              <ToolValue value={return_value} />
            )}
          </div>
        </div>
      )}
    </details>
  );
}

function ToolCallsChevron({ size }: { size: number }) {
  return (
    <span className="tool-calls-chevron" aria-hidden="true">
      <IconChevronDown size={size} />
    </span>
  );
}

function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
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
        label: capitalizeFirst(tc.label || tc.function.name || ""),
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
