export const THEME_IDS = ["default", "whatsapp", "builder"] as const;

export type ThemeId = (typeof THEME_IDS)[number];

function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" &&
    (THEME_IDS as readonly string[]).includes(value)
  );
}

export function resolveTheme(theme: unknown): ThemeId {
  return isThemeId(theme) ? theme : "default";
}

/**
 * Structural differences between themes — the things CSS cannot express, because
 * they add or remove DOM rather than restyle it.
 *
 * Declared here as a total `Record<ThemeId, …>` on purpose: adding an id to
 * THEME_IDS without describing its behaviour is then a compile error, instead of
 * the new theme silently falling through every `theme === "…"` check scattered
 * across components.
 */
export interface ThemeCapabilities {
  /** Minimum composer height in px. */
  inputMinHeight: number;
  /**
   * When to float a "new chat" button over the message list.
   * `when-chrome-hidden` means only if the header (and so the sidebar) is off.
   */
  floatingNewChat: "always" | "when-chrome-hidden" | "never";
  /**
   * Show the send button even when audio messages are enabled and the composer
   * is empty, so its position never shifts as the user types. This *adds* to the
   * mic rather than replacing it: with `enableAudioMessage` on, an empty
   * composer shows both, and the send button is disabled until there is
   * something to send.
   */
  alwaysShowSendButton: boolean;
  /**
   * The host already renders the model's reasoning into the message text, so
   * the widget must not render it a second time.
   *
   * True for `builder` only: `get_chat_widget_messages` replaces the message
   * body with `thinking_summary.html` -- a `<details>🧠 Thought for Ns</details>`
   * block -- while still shipping the untouched `raw_output_text` beside it. The
   * widget reads the latter, so without this flag the same reasoning appears
   * twice: once inside the bubble and once on the action row.
   */
  thinkingRenderedByHost: boolean;
}

export const THEME_CAPABILITIES: Record<ThemeId, ThemeCapabilities> = {
  default: {
    inputMinHeight: 44,
    floatingNewChat: "when-chrome-hidden",
    alwaysShowSendButton: false,
    thinkingRenderedByHost: false,
  },
  whatsapp: {
    inputMinHeight: 40,
    // Not "always": the header already carries a new-chat button in inline mode,
    // and showing both rendered the same icon and handler twice.
    floatingNewChat: "when-chrome-hidden",
    alwaysShowSendButton: false,
    thinkingRenderedByHost: false,
  },
  builder: {
    inputMinHeight: 40,
    // Deliberate for now, and the reason this table exists: builder is the only
    // theme with no way to start a new chat when the header is hidden. Recorded
    // as an explicit choice rather than an accident of a missing branch.
    floatingNewChat: "never",
    alwaysShowSendButton: true,
    thinkingRenderedByHost: true,
  },
};

/** Capabilities for a possibly-absent or unrecognised theme value. */
export const themeCapabilities = (theme: unknown): ThemeCapabilities =>
  THEME_CAPABILITIES[resolveTheme(theme)];
