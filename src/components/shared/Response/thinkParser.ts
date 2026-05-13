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
  while (i < text.length) {
    const openIdx = text.indexOf(OPEN, i);
    if (openIdx === -1) {
      const rest = text.slice(i);
      if (rest) segments.push({ kind: "answer", body: rest });
      break;
    }
    if (openIdx > i) {
      segments.push({ kind: "answer", body: text.slice(i, openIdx) });
    }
    const bodyStart = openIdx + OPEN.length;
    const closeIdx = text.indexOf(CLOSE, bodyStart);
    if (closeIdx === -1) {
      segments.push({
        kind: "think",
        body: text.slice(bodyStart),
        closed: false,
      });
      break;
    }
    segments.push({
      kind: "think",
      body: text.slice(bodyStart, closeIdx),
      closed: true,
    });
    i = closeIdx + CLOSE.length;
  }
  return segments;
}
