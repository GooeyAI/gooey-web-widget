## Tool Usage Display ("One live line")

How an incoming bot message shows progress and tool calls. Source design: Claude Design file "Tool Usage One Line" (Gooey design system). Read this before changing any file listed under **Files**.

### Summary

- While a reply is in progress, exactly **one** animated Gooey bot is visible for that message, always at the **top** of the message (above any tool summary and the answer text), with one muted status label beside it.
- As soon as a tool is used (a call still running counts), a muted `Used N tools` toggle with a chevron appears **on the same line** as the thinking line (`[bot] label · Used N tools ⌄`). Once the reply is final, the bot is gone and `Used N tools` is on its own line. Opening it shows a bordered table below that line: one row per call, each expandable to its inputs and output.
- No cards, borders or icon stacks around the status line. It must never compete with the answer text.

### States of one incoming message

Evaluated in order, per render of `IncomingMsg`:

| # | Condition | Top line | Under the line | Body |
|---|-----------|----------|----------------|------|
| 1 | no data yet, or type `CONVERSATION_START` / `RUN_START` | `ResponseLoader` → `ThinkingLine` "Thinking…" | — | — |
| 2 | streaming, no answer text | `ThinkingLine` (label rules below) | — | — |
| 3 | streaming, has answer text | `ThinkingLine` · `Used N tools` (once a tool is used), `gmb-8` below | the table, when open | streaming text |
| 4 | `FINAL_RESPONSE` | `Used N tools` if any tools | the table, when open | final text |

"Streaming" = `type !== STREAM_MESSAGE_TYPES.FINAL_RESPONSE`. "Has answer text" = `!!data.text`. `data.text` accumulates across `MESSAGE_PART` payloads; `data.detail` is the latest server run status.

### Thinking label rules (`getThinkingLabel` in `IncomingMsg.tsx`)

1. If any tool call is running → the **last running** tool's `label` (e.g. `Load Tools`, `Google search`). This includes uncounted tools (below).
2. Else if a status starting with `Summarizing` / `Summarising` (case-insensitive) has been seen for this message → the **most recent** such status (e.g. `Summarizing with GPT 5.6 Sol...`). It is kept in a ref because the server clears `detail` as soon as the model starts writing.
3. Else → `THINKING_LABEL` = `"Thinking…"` (exported from `ThinkingLine.tsx`).

All other server statuses (`Running...`, etc.) are deliberately hidden behind "Thinking…".

Observed sequence on a tool-using bot: `Thinking…` → `Summarizing with …` → `Load Tools` → `Summarizing with …` → `google search` → `Summarizing with …` → (final: line removed).

### Labels

`extractToolCallsFromFinalPrompt` capitalises the first letter of every tool label (`google search` → `Google search`), so the thinking line and the table rows agree.

### Row snippet

A row shows a one-line hint after its label in the tertiary text colour (`#67759b`), ellipsised when long: the call's search query (first of the inputs `search_query`, `query`, `q`, `search_term`, `keywords`, or, for any tool whose name or label contains "search", its first text input). See `getSnippet` in `ToolCalls.tsx`.

### Uncounted tools

`load_tools` (listed in `UNCOUNTED_TOOL_NAMES`, `ToolCalls.tsx`) is housekeeping: it is not counted in `Used N tools` and has no row in the table. `IncomingMsg` filters it out before passing `toolCalls` down, but the thinking label still names it while it runs. A message whose only call is `load_tools` shows no `Used N tools` at all.

### Inputs and output rendering

A row's Inputs and Output are rendered by `ToolValue` (`src/components/shared/ToolValue.tsx`), not as raw JSON: objects become label/value lists (`search_query` → "Search query", `url` → "URL"), arrays of short values read inline (`a, b, c`) and longer or nested ones become lists, booleans read Yes/No, bare URLs are links, and string results that are JSON text are parsed first. A key whose value is nested content (an object, or a list that isn't short enough to read inline) puts the key on its own line with the content below it, indented behind a vertical thread line (Reddit-style), recursively. Anything nested deeper than 4 levels falls back to compact JSON.

### Position invariants (do not regress)

- The status row (thinking line, `Used N tools`) is rendered **inside the incoming bubble** (`.gooey-incoming-bubble`), above the answer text, never as a separate element beside it. The only exception is the loader before any message exists.
- The server's run status (`data.detail`: "Running…", "Summarizing with…") is never printed as answer text. `extractOutputText` in `responseParser.tsx` reads `text` only; the status is shown solely by the thinking line. (It used to fall back to `detail`, which painted the status inside the answer a second time.)
- One `.gooey-thinking-bot` per streaming message. Never render a second bot for tools, the loader and the text at the same time.
- Horizontal position is fixed: all thinking lines sit inside the message gutter `gpl-${MESSAGE_GUTTER + 4}` (`MESSAGE_GUTTER = 8`), including `ResponseLoader`.
- The bot never moves between send and the end of the run: it is the first element in the message, so streamed text and the tool summary grow below it. `Used N tools` appears beside it on the same line, so nothing shifts when it does.
- `ThinkingLine` always renders a label, so its height is constant.
- The old trailing streaming dot (`.response-streaming …:after { content: "\25CF" }` + `pulseSize`) and the blinking `CircleBeat` loader are removed. Do not reintroduce them.

Verification recipe: poll every 50ms for `shadowRoot.querySelectorAll('.gooey-thinking-bot')` during a run and log `{count, left, top, label}`. Expect count 1 and constant `left`/`top` at the start of the message (the bot hops a few px as part of its animation, but its slot does not move).

### Components

**`ThinkingLine({ label = "Thinking…" })`**, `src/components/shared/ThinkingLine.tsx`
- `div.gooey-thinking-line[role=status]` containing `GooeyBotThinking` and `div.gooey-thinking-label`.
- Flex row, `gap: 9px`, `align-items: center`.
- Label: 14px, line-height 140%, single line with ellipsis, shimmer gradient `#67759b → #0a1021 → #67759b` via `background-clip: text`, `background-size: 220%`, 2s linear infinite.

**`GooeyBotThinking()`**, same file
- Inline SVG, 22×17, `viewBox="0 -4 133 104"`. Body, ears, antenna stem **and** antenna bulb are all `#0a1021` (black). Eyes `#fff`.
- Animation: see **Bot animation** at the end of this file (`thinkingBotMorph.scss`).

**`ToolCalls({ toolCalls })`**, `src/components/shared/ToolCalls.tsx`
- Takes an optional `lead` (the `ThinkingLine`). With no calls it renders just `lead` (or nothing). As soon as there is at least one counted call, running or not, it renders one row `lead · Used N tools ⌄`; a running call is counted. In the table a running call shows a pulsing `Running…` tag; if it has inputs it can be expanded (Output reads `Running…`), and if it has nothing to show yet it is a static, non-expandable row.
- `div.tool-calls-header` holds `lead`, a `·` separator and `button.tool-calls-summary[aria-expanded]` (`Used {n} tool|tools` + chevron). The `div.tool-calls-table` (one `ToolCallRow` per call) renders below it while open (React state, not `<details>`). Without `lead` the wrapper carries `gmb-12`.
- `extractToolCallsFromFinalPrompt(final_prompt)` is exported. `IncomingMsg` calls it once and passes the result down. Each `ToolCall` has `id, name (function name), label, icon, inputs, return_value, is_running, run_url`.

**`ToolCallRow`**, same file
- `details.tool-call-row` > `summary.tool-call-row-summary`: `ToolCallIcon`, label (ellipsis), chevron pushed right.
- Body: `Inputs` header (with `View tool call ↗` link when `run_url` exists), inputs JSON block; `Output` header, output block (string as-is, else pretty JSON).
- Expand/collapse is native `<details>`. There is no React state; chevron rotation is CSS on `[open]`.

**`ToolCallIcon({ name, icon })`**, `src/components/shared/ToolCallIcon.tsx`
Resolution order:
1. `name` matches `/google.?search/i` → inline 4-colour Google "G" SVG (13px).
2. `name` in `TOOL_ICONS` → `<i class="fa-regular fa-…">`.
3. Server `icon` is a URL (`http…` or `/…`) → `<img>` 14px (workflow photos).
4. Otherwise → `fa-regular fa-screwdriver-wrench`. Server emoji icons are intentionally ignored.

`TOOL_ICONS` (function name → icon):

| Function name | Icon |
|---|---|
| `load_tools` | `fa-toolbox` |
| `file_search`, `search_workflows` | `fa-magnifying-glass` |
| `transfer_call` | `fa-phone` |
| `collect_feedback` | `fa-comment-dots` |
| `new_conversation` | `fa-pen-to-square` |
| `update_conversation_title` | `fa-pen` |
| `fetch_workflow_state` | `fa-file-lines` |
| `update_workflow_state` | `fa-sliders` |
| `run_workflow` | `fa-play` |
| `save_workflow`, `save_as_new_workflow` | `fa-floppy-disk` |
| `deploy_workflow` | `fa-rocket` |
| `GOOEY_MEMORY_{READ,WRITE,DELETE}_VALUE` | `fa-brain` |

Function names come from `gooey-server` (`functions/*.py`, `name=` / `name =`). Workflow tools use `slugify(title).replace("-", "_")`. Add new tools here as a single mapping entry.

### Visual tokens

Values mirror the Gooey design system (`colors_and_type.css`, `--gy-*`). The widget runs on third-party pages in a shadow root, so they are SCSS constants (`$tc-*` in `toolCalls.scss`, `$tl-*` in `thinkingLine.scss`), not host CSS variables.

| Role | Value | Source token | Contrast |
|---|---|---|---|
| ink (hover text, shimmer peak, bot) | `#0a1021` | `--gy-ink` | — |
| muted text (summary, rows, code) | `#4b587a` | `--gy-ink-muted` | 7.06:1 on white, 6.48:1 on `#f7f5f2` |
| tertiary text (section headers, shimmer ends) | `#67759b` | `--gooey-text-tertiary` | 4.57:1 on white |
| line (table border, row dividers) | `#e6e6e6` | `--gy-line-soft` | decorative |
| row hover bg | `#fbfaf8` | `--gy-surface-50` | — |
| code block bg | `#f7f5f2` | `--gy-surface-100` | — |
| link | `#00998a` | `--gy-teal-700` | — |

Do **not** use the design's `--gy-ink-soft` (`#8994b1`) for text: 3.03:1 fails WCAG AA.

| Element | Spec |
|---|---|
| Summary line | 14px / 140%, gap 7px, chevron 11px |
| Table | 1px border, radius 16px, overflow hidden, 10px below summary |
| Row | padding 11px 14px, 13px / 140%, gap 8px, chevron 10px right-aligned |
| Row icon | FA 12px in 14px box; Google G 13px; image 14px |
| Row body | padding 0 14px 12px, gap 6px |
| Section header | 11px, tertiary |
| JSON block | mono 11px / 150%, radius 8px, padding 8px 10px, max-height 200px scroll, `pre-wrap` |
| Chevron | shared `IconChevronDown` filled `currentColor`; −90° closed (points right), 0° open |

Motion: table rise 220ms (`gooeyTcRise`, 4px), row body 200ms (`gooeyTcRowIn`, −3px), colour/background transitions 160–180ms. Under `prefers-reduced-motion: reduce`, all animations and transitions are off and the thinking label becomes solid `#4b587a`.

### Font Awesome in the widget

`src/fontAwesome.tsx`, rendered as `<FontAwesomeStyles />` next to `<Styles />` in `src/widgets/index.tsx`.

- Uses Gooey's FA **Pro** kit `8af9787bd5` (web-font method, FA 7), the same kit gooey.ai uses. The kit, its CSS and its fonts load from any domain (verified with foreign referrers; CORS `*`).
- A `<link>` to `https://kit.fontawesome.com/8af9787bd5.css` sits **inside the shadow root**, so FA class rules never touch the host page.
- Browsers ignore `@font-face` inside a shadow root. `injectFontFaces()` fetches the kit CSS, copies only the `"Font Awesome 7 …"` `@font-face` rules (with URLs made absolute) into one `<style id="gooey-fa-font-faces">` in `document.head`, once per page. These family names cannot clash with a host's own FA 5/6. Fonts download only when a glyph is used.
- The widget base rule `.gooey-embed-container * :not(code *) { font-family: … }` outranks `.fa-*`. `fontAwesome.tsx` adds `.gooey-embed-container i[class*="fa-"] { font-family: var(--_fa-family); }` to restore it. Without it, icons render as boxes.
- Do not commit Pro SVG paths into this repo: it is public (Apache-2.0) and the Pro license forbids redistributing icon sources.
- Each pageview of a site embedding the widget counts against the kit's pageview allowance.

### Files

| File | Role |
|---|---|
| `src/widgets/copilot/components/Messages/IncomingMsg.tsx` | State machine above: `toolCalls`, `hasText`, `summarizingRef`, `getThinkingLabel`, `isSummarizingStatus` |
| `src/widgets/copilot/components/Loader/index.tsx` | Pre-data loader, `ThinkingLine` in the message gutter |
| `src/components/shared/ThinkingLine.tsx` / `thinkingLine.scss` | Bot + label, shimmer, bot animations |
| `src/components/shared/ToolCalls.tsx` / `toolCalls.scss` | `Used N tools` summary, table, rows, extractor |
| `src/components/shared/ToolCallIcon.tsx` | Tool name → icon mapping, Google G |
| `src/fontAwesome.tsx` | FA Pro kit loading for shadow DOM |
| `src/components/shared/Response/response.scss` | Streaming dot rules removed |

Server side (`gooey-server`, not in this repo): tool `label` and `icon` are attached per call in `daras_ai_v2/harness.py` (`call["label"]`, `call["icon"] = tool.get_icon()`). Run statuses such as `Summarizing with {model}...` come from `daras_ai_v2/harness.py` and reach the widget as `detail`. `showToolCalls` is set by each embedding page (`recipes/VideoBots.py`, `daras_ai_v2/gooey_builder.py`).

### Known gaps / follow-ups

- The design uses present-progressive live labels ("Reading your Google Doc") and past-tense settled labels ("Read your Google Doc"). The server sends one `label` per tool, so both states show the same text.
- The design shows a service name (e.g. "Google Docs") in the expanded row. Not available in the data; rows show raw inputs and output instead.
- Dark mode has no dedicated styling for this UI.
- WhatsApp theme: the thinking line, the `Used N tools` summary and the table are themed from the component stylesheets (`thinkingLine.scss`, `toolCalls.scss`), scoped to `.gooey-chat-theme[data-gooey-theme="whatsapp"]` so they work wherever that theme exists. Inside the bubble the row is bare and the table is a flat inset card. Standing alone (only the loader before any message exists) the line is a white pill with the bubble's shadow, like WhatsApp's own system chips, because bare text is lost in the wallpaper doodles.
- The first render of an FA icon can be blank briefly while its font subset downloads (`font-display: block`).
- `src/main.js` has `showToolCalls: true // TEMP: local preview only` for the dev page. Revert before merging.

### Local preview

- Widget dev page: `npx vite --port 5199` in this repo, open `http://localhost:5199` (mounts the live Base Copilot; tool calls need the TEMP flag above).
- Inside `gooey-server`: serve a watch build (`npx vite build --watch --outDir <dir>`, then a static server) and set `WEB_WIDGET_LIB=http://localhost:<port>/lib.js` in the `.env` of the checkout the Docker `api` container mounts, then restart `api`.

### Bot animation

`GooeyBotThinking` (in `ThinkingLine.tsx`) plays a single 28s loop made of four 7s acts. Every act starts and ends the same way: the bot blinks, bounces and squashes into three dots (ear · head · ear), and at the end the dots pop back into the bot. Only the middle, where the dots move, changes:

| act | dots |
|-----|------|
| 1 `wave` | classic typing-indicator wave, three times |
| 2 `orbit-2d` | circle a flat ring around a fixed centre |
| 3 `pogo` | take turns jumping with squash and stretch |
| 4 `orbit-3d` | spin on a tilted ring, with depth scaling and fading |

then back to act 1. It lives in `thinkingBotMorph.scss`: the bot parts are a 7s loop that repeats four times, and each dot has one 28s animation holding all four acts, so the two stay in step. Dot paths are sampled into keyframes by Sass functions at compile time (`gtb-orbit-2d`, `gtb-orbit-3d`, and the wave / pogo mixins), so tuning a path means editing those. Reduced-motion falls back to the static bot.
