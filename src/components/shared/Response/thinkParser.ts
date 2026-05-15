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

const OPEN = "<think>";
const CLOSE = "</think>";

export function splitThinkSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  let pos = 0;
  while (pos < text.length) {
    const openIdx = text.indexOf(OPEN, pos);
    if (openIdx === -1) {
      segments.push({
        type: "answer",
        body: text.slice(pos),
      });
      return segments;
    }
    if (openIdx > pos) {
      segments.push({
        type: "answer",
        body: text.slice(pos, openIdx),
      });
    }
    const bodyStart = openIdx + OPEN.length;
    const closeIdx = text.indexOf(CLOSE, bodyStart);
    if (closeIdx === -1) {
      segments.push({
        type: "think",
        body: text.slice(bodyStart),
        closed: false,
      });
      return segments;
    }
    segments.push({
      type: "think",
      body: text.slice(bodyStart, closeIdx),
      closed: true,
    });
    pos = closeIdx + CLOSE.length;
  }
  return segments;
}
