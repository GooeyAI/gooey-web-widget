export type ThinkSegment = {
  type: "think";
  body: string;
  closed: boolean;
};

export type AnswerSegment = {
  type: "answer";
  body: string;
};

export type Segment = ThinkSegment | AnswerSegment;

// Order matters: fenced and inline code spans match before <think>, so any
// <think> inside them is consumed as part of the code token and never
// re-matched. Code spans have no capture groups; think alternatives do.
const TOKEN_RE =
  /```[\s\S]*?```|`[^`\n]*`|<think>([\s\S]*?)<\/think>|<think>([\s\S]*)$/g;

export function splitThinkSegments(text: string): Segment[] {
  const out: Segment[] = [];
  let pos = 0;
  for (const m of text.matchAll(TOKEN_RE)) {
    // Code-span match — leave it in place (it'll fall into the next answer
    // slice) and don't advance pos.
    if (m[1] === undefined && m[2] === undefined) continue;
    const start = m.index ?? 0;
    if (start > pos) {
      out.push({ type: "answer", body: text.slice(pos, start) });
    }
    const closedBody = m[1];
    out.push({
      type: "think",
      body: closedBody ?? m[2],
      closed: closedBody !== undefined,
    });
    pos = start + m[0].length;
  }
  if (pos < text.length) {
    out.push({ type: "answer", body: text.slice(pos) });
  }
  return out;
}
