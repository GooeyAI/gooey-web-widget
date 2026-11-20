/**
 * A reply's reasoning, pulled apart from its answer.
 *
 * Reasoning models wrap their summary in `<think>…</think>`. Those tags never
 * survive streaming — `daras_ai_v2/bots.py:265` runs `parse_bot_html` on every
 * outgoing message and drops them — so the only place the widget ever sees an
 * intact pair is `raw_output_text[0]` on the final response. Split that, not
 * the accumulated stream text, which provably carries no tags at all.
 */

export interface ThinkingSplit {
  /** Every `<think>` block's contents, in order, joined by a blank line. */
  thinking: string;
  /** What is left once the blocks are removed: the answer to show. */
  answer: string;
}

// Deliberately the same rule as the server's own THINKING_TAG_RE
// (`daras_ai_v2/bots.py:733`), including the `|$` arm that lets an unterminated
// opener swallow the rest of the string. Two consequences, both intended:
//
//  - a reply cut off mid-reasoning keeps that reasoning out of the answer;
//  - a bot that writes a literal `<think>` in its answer loses everything after
//    it — which is exactly what the server already does to that reply, so the
//    widget agreeing with it is the point. Diverging here would be the bug.
//
// Used only via `replace` and `matchAll`; neither leaves `lastIndex` dirty.
const THINKING_TAG_RE = /<think\b[^>]*>([\s\S]*?)(?:<\/think\s*>|$)/gi;

export function splitThinking(raw: string): ThinkingSplit {
  if (!raw) return { thinking: "", answer: "" };

  const thinking = Array.from(raw.matchAll(THINKING_TAG_RE))
    .map((match) => (match[1] ?? "").trim())
    .filter(Boolean)
    .join("\n\n");

  return { thinking, answer: raw.replace(THINKING_TAG_RE, "").trim() };
}

/**
 * `"Thought for 3s"`, or null when there is no duration worth showing.
 *
 * Null rather than a zero-length string so a caller can drop the whole part:
 * an absent `metrics` must not render "Thought for undefineds". Rounds up to
 * 1s so a fast run does not claim to have thought for no time at all.
 */
export function formatThoughtFor(
  seconds: number | undefined | null,
): string | null {
  if (seconds == null || !Number.isFinite(seconds) || seconds <= 0) return null;
  return `Thought for ${Math.max(1, Math.round(seconds))}s`;
}
