import { addInlineStyle } from "src/addStyles";
import morphStyle from "./thinkingBotMorph.scss?inline";
import style from "./thinkingLine.scss?inline";

addInlineStyle(style);
addInlineStyle(morphStyle);

export const THINKING_LABEL = "Thinking…";

// A single muted line that narrates what the bot is doing, led by the animated bot
export function ThinkingLine({ label = THINKING_LABEL }: { label?: string }) {
  return (
    <div className="gooey-thinking-line" role="status">
      <GooeyBotThinking />
      <div className="gooey-thinking-label">{label}</div>
    </div>
  );
}

const DOT_X = [15, 66, 117];
// The dots grow out of the bot's eyes and must stay on that line, or the morph
// between the two jumps. The eye line is also what `--gooey-thinking-bot-lift`
// puts on the label's centre, so sitting here is what leaves the dots centred.
const DOT_CY = 70.76;

// Gooey bot mark from the design system, animated while the bot works: it bounces into
// three dots, which play four different acts in turn (wave → 2D orbit → pogo → 3D orbit),
// then re-forms into the bot. See thinkingBotMorph.scss.
export function GooeyBotThinking() {
  return (
    <svg
      className="gooey-thinking-bot"
      width="22"
      height="17"
      viewBox="0 -4 133 104"
      fill="none"
      aria-hidden="true"
    >
      <g className="gooey-thinking-bot-rig">
        <g className="gooey-thinking-bot-antenna">
          <rect x="62.89" y="12" width="6.47" height="27" fill="#0a1021" />
          <circle
            className="gooey-thinking-bot-bulb"
            cx="66.12"
            cy="6.93"
            r="6.93"
            fill="#0a1021"
          />
        </g>
        <path
          className="gooey-thinking-bot-ear-l"
          d="M18.36 88.72H8.58C3.84 88.72 0 84.88 0 80.14V61.89C0 57.16 3.84 53.32 8.58 53.32H18.36Z"
          fill="#0a1021"
        />
        <path
          className="gooey-thinking-bot-ear-r"
          d="M113.89 53.32H123.66C128.4 53.32 132.24 57.16 132.24 61.89V80.14C132.24 84.88 128.4 88.72 123.66 88.72H113.89Z"
          fill="#0a1021"
        />
        <rect
          className="gooey-thinking-bot-body"
          x="23.53"
          y="41.36"
          width="85.19"
          height="58.64"
          rx="4.77"
          fill="#0a1021"
        />
        <g className="gooey-thinking-bot-eyes">
          <ellipse
            className="gooey-thinking-bot-eye"
            cx="44.07"
            cy="70.76"
            rx="8.38"
            ry="8.38"
            fill="#fff"
          />
          <ellipse
            className="gooey-thinking-bot-eye"
            cx="88.17"
            cy="70.76"
            rx="8.38"
            ry="8.38"
            fill="#fff"
          />
        </g>
        {DOT_X.map((cx, i) => (
          <circle
            key={cx}
            className={`gooey-thinking-bot-dot gooey-thinking-bot-dot-${i}`}
            cx={cx}
            cy={DOT_CY}
            r="15"
          />
        ))}
      </g>
    </svg>
  );
}
