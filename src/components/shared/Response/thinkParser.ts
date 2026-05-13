export type ThinkSegment = {
  kind: "think";
  body: string;
  closed: boolean;
};

export type AnswerSegment = {
  kind: "answer";
  body: string;
};

export type Segment = ThinkSegment | AnswerSegment;

const OPEN = "<think>";
const CLOSE = "</think>";

export function splitThinkSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  let i = 0;
  let answerStart = 0;
  let thinkStart = -1;
  let depth = 0;

  while (i < text.length) {
    if (text.startsWith(OPEN, i)) {
      if (thinkStart === -1) {
        if (i > answerStart) {
          segments.push({ kind: "answer", body: text.slice(answerStart, i) });
        }
        thinkStart = i + OPEN.length;
      } else {
        depth++;
      }
      i += OPEN.length;
      continue;
    }
    if (text.startsWith(CLOSE, i) && thinkStart !== -1) {
      if (depth === 0) {
        segments.push({
          kind: "think",
          body: text.slice(thinkStart, i),
          closed: true,
        });
        i += CLOSE.length;
        thinkStart = -1;
        answerStart = i;
      } else {
        depth--;
        i += CLOSE.length;
      }
      continue;
    }
    i++;
  }

  if (thinkStart !== -1) {
    segments.push({
      kind: "think",
      body: text.slice(thinkStart),
      closed: false,
    });
  } else if (answerStart < text.length) {
    segments.push({ kind: "answer", body: text.slice(answerStart) });
  }
  return segments;
}
