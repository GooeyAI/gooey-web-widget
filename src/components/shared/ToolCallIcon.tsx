// tool function name -> fa-regular icon from Gooey's Font Awesome kit;
// anything unlisted falls back to the wrench
const TOOL_ICONS: Record<string, string> = {
  load_tools: "fa-toolbox",
  file_search: "fa-magnifying-glass",
  search_workflows: "fa-magnifying-glass",
  transfer_call: "fa-phone",
  collect_feedback: "fa-comment-dots",
  new_conversation: "fa-pen-to-square",
  update_conversation_title: "fa-pen",
  fetch_workflow_state: "fa-file-lines",
  update_workflow_state: "fa-sliders",
  run_workflow: "fa-play",
  save_workflow: "fa-floppy-disk",
  save_as_new_workflow: "fa-floppy-disk",
  deploy_workflow: "fa-rocket",
  GOOEY_MEMORY_READ_VALUE: "fa-brain",
  GOOEY_MEMORY_WRITE_VALUE: "fa-brain",
  GOOEY_MEMORY_DELETE_VALUE: "fa-brain",
};

// The backend sends a per-tool `icon` — a URL, or a glyph like "🌐". Only URLs
// were ever used, so a tool outside the table above fell through to the wrench
// even when the server had said what it was. A customer's own tools are exactly
// the ones this table cannot know about, so its icon is worth reading.
const isUrlIcon = (icon: string) =>
  icon.startsWith("http") || icon.startsWith("/");
// a glyph or two, not a sentence that happened to arrive in the field
const isGlyphIcon = (icon: string) =>
  !!icon.trim() && Array.from(icon.trim()).length <= 2;

export function ToolCallIcon({ name, icon }: { name: string; icon?: string }) {
  if (/google.?search/i.test(name)) {
    return <GoogleIcon />;
  }
  const faIcon = TOOL_ICONS[name];
  if (!faIcon && icon) {
    if (isUrlIcon(icon)) {
      return <img src={icon} alt="" className="tool-call-icon-image" />;
    }
    if (isGlyphIcon(icon)) {
      return (
        <span className="tool-call-icon-glyph" aria-hidden="true">
          {icon.trim()}
        </span>
      );
    }
  }
  return (
    <i
      className={`fa-regular ${faIcon || "fa-screwdriver-wrench"} tool-call-icon-fa`}
      aria-hidden="true"
    />
  );
}

// Google "G" mark
function GoogleIcon() {
  return (
    <svg className="tool-call-icon-svg" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
