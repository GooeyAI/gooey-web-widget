import clsx from "clsx";
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { marked } from "marked";
import { type ReactNode, useMemo, useState } from "react";
import { addInlineStyle } from "src/addStyles";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import { MARKED_OPTIONS } from "./Response/responseParser";
import style from "./toolCalls.scss?inline";

addInlineStyle(style);

// The reasoning is the one model text the server hands over untouched. Every
// other surface the widget renders has been through parse_bot_html server-side
// (daras_ai_v2/bots.py), which keeps only top-level text nodes and so can never
// carry markup. raw_output_text is raw by definition, and this panel is the
// first place it is rendered.
//
// So HTML is escaped before markdown runs. A <style> here would land inside the
// shadow root and could restyle or hide the widget's own chrome; an <iframe>
// would load whatever it liked. Markdown still works -- raw tags render as the
// text the model wrote.
const escapeHtml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Markdown can still mint a link, and `[x](javascript:...)` is a real payload,
// so hrefs are an http(s) allowlist: anything else keeps its text and loses its
// link. target/rel because without them a link in this panel navigates the
// customer's host page away from their own site. The answer path needs none of
// this -- its handler swaps every <a> for Link.tsx, which emits no href at all.
const REASONING_PARSER: HTMLReactParserOptions = {
  replace: (node) => {
    if (!(node instanceof Element) || node.name !== "a") return;
    const children = domToReact(node.children as DOMNode[], REASONING_PARSER);
    if (!/^https?:\/\//i.test(node.attribs?.href ?? "")) return <>{children}</>;
    return (
      <a href={node.attribs.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

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

/** "Using Google Search", or "Using Google Search +1" when others run too. */
export function getRunningToolsLabel(toolCalls: ToolCall[]): string | null {
  const running = toolCalls.filter((toolCall) => toolCall.is_running);
  const latest = running[running.length - 1];
  if (!latest) return null;
  const more = running.length > 1 ? ` +${running.length - 1}` : "";
  return `Using ${latest.label || latest.name}${more}`;
}

/**
 * What a run did, on one line: "Thought · Used 3 tools". Opening it
 * reveals the reasoning and then the calls themselves. Collapsed by default: on
 * a run with any real tool use the calls outweigh the answer, and the answer is
 * what the reader came for.
 *
 * One disclosure rather than two because the row describes one run. Either half
 * may be absent, so the label is assembled from the parts that exist.
 */
function ToolCalls({
  toolCalls,
  lead,
  isExpanded,
  onToggle,
  thinking,
}: {
  toolCalls: ToolCall[];
  lead?: ReactNode;
  isExpanded: boolean;
  // given the summary button, so the owner can keep that line in view
  onToggle: (summary: HTMLElement) => void;
  /** The model's reasoning summary, already split out of the answer. */
  thinking?: string;
}) {
  // Open state is owned by IncomingMsg, not here. When the run ends this summary
  // moves from the status line into the action row — a different parent, so this
  // component really does remount — and a reader who opened the dropdown must not
  // lose it to that. Mounting already open is that move, so the table must not
  // rise in a second time; once the reader toggles it, opens are real again.
  const [isRestored, setIsRestored] = useState(isExpanded);

  // Same markdown dialect as the answer: a reasoning summary arrives with its
  // own "**Bold heading**" per part and reads as a wall otherwise. Built only
  // once the panel is open -- a restored conversation would otherwise parse
  // every reasoning message on mount for a panel nobody opened, which is the
  // same reason ToolCallRow below defers its own body.
  const reasoningBody = useMemo(
    () =>
      isExpanded && thinking
        ? parse(
            marked.parse(escapeHtml(thinking), MARKED_OPTIONS) as string,
            REASONING_PARSER,
          )
        : null,
    [thinking, isExpanded],
  );

  const toolsPart = toolCalls.length
    ? `Used ${toolCalls.length} ${toolCalls.length === 1 ? "tool" : "tools"}`
    : null;
  // Named, not timed. The server reports a thinking duration even when the
  // summary itself comes back empty, so a label built on the clock said
  // "Thought for 2s" on one reply and nothing on the next for no reason the
  // reader could see. Keyed to the reasoning text instead, the label is there
  // exactly when there is something behind the chevron to read.
  const thoughtPart = thinking ? "Thought" : null;
  const summary = [thoughtPart, toolsPart].filter(Boolean).join(" \u00b7 ");

  // Nothing to name is nothing to open: a run with neither reasoning nor tools
  // returns the lead alone, exactly as before this feature existed.
  if (!summary) return <>{lead}</>;
  // While a tool runs, the lead names it ("Using Google Search") and is the
  // whole line, so the summary gives way to its chevron and the line opens the
  // table. The lead only exists while streaming.
  const isToolRunning =
    !!lead && toolCalls.some((toolCall) => toolCall.is_running);

  return (
    <div className={clsx("tool-calls-container mw-100")}>
      <div
        className={clsx(
          "tool-calls-header",
          isToolRunning && "is-tool-running",
        )}
      >
        {lead}
        {lead && !isToolRunning && (
          <span className="tool-calls-separator">·</span>
        )}
        <button
          type="button"
          className="tool-calls-summary"
          aria-expanded={isExpanded}
          aria-label={isToolRunning ? summary : undefined}
          onClick={(event) => {
            setIsRestored(false);
            onToggle(event.currentTarget);
          }}
        >
          {!isToolRunning && summary}
          <ToolCallsChevron size={11} />
        </button>
      </div>
      {isExpanded && (
        <div className={clsx("tool-calls-table", isRestored && "is-restored")}>
          {reasoningBody && (
            <div className="tool-calls-reasoning">{reasoningBody}</div>
          )}
          {toolCalls.map((toolCall) => (
            <ToolCallRow key={String(toolCall.id)} toolCall={toolCall} />
          ))}
        </div>
      )}
    </div>
  );
}

// One chevron, pointing right when closed and down when open. The rotation is
// CSS on [aria-expanded] / [open], so no second icon and no state to read here.
function ToolCallsChevron({ size }: { size: number }) {
  return (
    <span className="tool-calls-chevron" aria-hidden="true">
      <IconChevronDown size={size} />
    </span>
  );
}

function ToolCallIcon({ icon }: { icon?: string }) {
  const isUrl = !!icon && (icon.startsWith("http") || icon.startsWith("/"));
  if (isUrl) return <img src={icon} alt="" className="tool-call-icon-image" />;
  return (
    <span className="tool-call-icon-glyph">{icon || "\u{1F6E0}\u{FE0F}"}</span>
  );
}

function ToolCallRow({ toolCall }: { toolCall: ToolCall }) {
  const { label, inputs, return_value, is_running, icon, run_url } = toolCall;
  const [isExpanded, setIsExpanded] = useState(false);

  const snippet = getSnippet(toolCall);
  const hasInputs = !!inputs && Object.keys(inputs).length > 0;

  // A running call with no inputs has nothing to open yet, so it is a plain row
  // rather than a disclosure that reveals an empty body.
  if (is_running && !hasInputs) {
    return (
      <div className="tool-call-row">
        <div className="tool-call-row-summary is-static">
          <ToolCallIcon icon={icon} />
          <span className="tool-call-row-label">{label}</span>
          {snippet && <span className="tool-call-row-snippet">{snippet}</span>}
          <span className="tool-call-running">Running…</span>
        </div>
      </div>
    );
  }

  return (
    <details
      open={isExpanded}
      onToggle={(e) => setIsExpanded((e.target as HTMLDetailsElement).open)}
      className="tool-call-row"
    >
      <summary className="tool-call-row-summary">
        <ToolCallIcon icon={icon} />
        <span className="tool-call-row-label">{label}</span>
        {snippet && <span className="tool-call-row-snippet">{snippet}</span>}
        {is_running && <span className="tool-call-running">Running…</span>}
        <ToolCallsChevron size={10} />
      </summary>

      {/* Built only once this row is opened. A <details> renders its children
          either way and lets the browser hide them, so opening the table laid
          out every call's inputs and output, not just the one clicked. */}
      {isExpanded && (
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
                {JSON.stringify(inputs, null, 2)}
              </div>
            </>
          )}
          <div className="tool-call-section-header">Output</div>
          <div className="tool-call-value">
            {is_running
              ? "Running\u2026"
              : typeof return_value === "string"
                ? return_value
                : JSON.stringify(return_value, null, 2)}
          </div>
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
