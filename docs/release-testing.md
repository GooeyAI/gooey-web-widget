# Release testing

Run this **before every release**, against the build `scripts/publish.sh` is
about to tag. A full pass takes about 40 minutes. Record each check as ✅, ❌
(with a note) or — (not applicable). Don't publish with a ❌ that isn't listed
under [Known issues](#known-issues).

Every check has an ID, so a failure can be reported as "F3 fails on Safari".

---

## 0. Before you start

**Build what you're about to publish**, from the commit you'll release.
`npm run build` is what `publish.sh` runs. Blank the Sentry token so a test
build doesn't upload source maps.

```bash
SENTRY_AUTH_TOKEN="" npm run build
```

**Serve the repo root and open the test page.**
[`release-test.html`](release-test.html) loads `dist/lib.js` with every option
switched on.

```bash
python3 -m http.server 5500
```

```
http://localhost:5500/docs/release-test.html
```

To tell a new failure from an old one, open the same page with `?v=` set to
the live release (e.g. `?v=2.14.0`) and compare.

| Parameter    | Values                           | Default                      |
| ------------ | -------------------------------- | ---------------------------- |
| `v`          | a published release to compare   | the local build              |
| `mode`       | `inline`, `popup`, `fullscreen`  | `inline`                     |
| `theme`      | `default`, `whatsapp`, `builder` | `default`                    |
| `id`         | integration id                   | `Kbo` (web search and tools) |
| `header=0`   | hide the header                  | shown                        |
| `two=1`      | two widgets side by side         | one                          |
| `expanded=1` | sources start expanded           | collapsed                    |
| `autoplay=0` | don't autoplay reply audio       | autoplay                     |

**You also need:**

- a bot with a knowledge base, so replies carry sources (section F);
- the gooey.ai agent page running locally with
  `WEB_WIDGET_LIB=http://localhost:5500/dist/lib.js`, so it loads this build
  (L);
- a gooey.ai `/chat/<name>-<integration id>` page for sharing (M).

**Browsers:** Chrome desktop for the full pass; then repeat A, C, D, I and
K on Safari (macOS or iOS) and once at phone width.

---

## A. Loading and mounting

| ID  | Check                              | Expected                                                                                                                |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| A1  | Load the test page                 | The label shows `local build`; the widget renders; the browser console has no errors or React warnings                  |
| A2  | `mode=inline`                      | The widget fills its box with rounded corners; the header has the sidebar toggle, bot name and New Chat pencil          |
| A3  | `mode=popup`                       | A launcher at the bottom right shows the `fabLabel` text; clicking it opens the widget and hides the launcher           |
| A4  | Popup: the chevron in the header   | Closes the popup; the launcher comes back; reopening keeps the conversation                                             |
| A5  | Popup on a window wider than 768px | An expand button ("Enable Focus") grows the popup to the full window over a dimmed backdrop; "Disable Focus" returns it |
| A6  | `mode=fullscreen`                  | The widget covers the whole page                                                                                        |
| A7  | `two=1`                            | Two independent widgets. Sending or stopping in one leaves the other unchanged                                          |
| A8  | `header=0`                         | No header or sidebar. After the first message a round New chat button floats above the composer (not in builder)        |
| A9  | The host page                      | Nothing outside the widget changes style; the page doesn't scroll sideways                                              |

## B. Empty state and branding

| ID  | Check                 | Expected                                                                      |
| --- | --------------------- | ----------------------------------------------------------------------------- |
| B1  | Fresh conversation    | Avatar, bot name, byline with a globe that links to `websiteUrl`, description |
| B2  | Conversation starters | All three shown; clicking one sends it as your message                        |
| B3  | Composer placeholder  | Shows `inputPlaceholderText`                                                  |
| B4  | Footer                | "Powered by Gooey.AI" under the composer                                      |
| B5  | Primary colour        | The send/stop button and links in replies use `colors.primary`                |

## C. Composer

| ID  | Check                                           | Expected                                                                               |
| --- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| C1  | Type and press Enter                            | Sends; Shift+Enter adds a line instead                                                 |
| C2  | Long text                                       | The box grows up to about 200px, then scrolls inside                                   |
| C3  | Send button                                     | Appears once there is text; disabled while empty                                       |
| C4  | "+" → Image or Video, pick an image             | A thumbnail with a spinner while it uploads; X removes it; clicking it opens a preview |
| C5  | "+" → File, pick a PDF                          | A file chip (name and extension); clicking previews it                                 |
| C6  | Send with an image and "what is in this image?" | The image shows in your message; the reply describes it                                |
| C7  | Mic, allow access, speak 3 seconds, send        | Red mic and timer while recording; X discards; send transcribes and replies            |
| C8  | Mic, deny access                                | "Hmm. We need microphone access." with a Reload button                                 |
| C9  | Mic visibility                                  | Hidden once you type or attach something                                               |

## D. A reply in progress

| ID  | Check                                     | Expected                                                                                                                             |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| D1  | Send a question                           | Your message goes to the top; under it the bot animation and "Working…"                                                             |
| D2  | Watch the status line                     | Shows the server's own words ("Summarizing with…", "[3/40] Creating knowledge embeddings…"); never stuck on one label for a long run |
| D3  | A question that searches the web          | "Using Google Search" while the tool runs, then "Used 1 tool ›" at the end of the status line                                        |
| D4  | Stop button (replaces Send while running) | Stops the reply and removes the question; the composer works again                                                                   |
| D5  | Text arrives                              | It streams in; there is no pulsing dot after the text                                                                                |
| D6  | The reply finishes                        | The status line is replaced by the action row (H1); nothing jumps                                                                    |

## E. Reply content

Ask: _"Reply with a markdown table of 3 dams, a short Python code block, E = mc^2
in LaTeX, and a numbered list of 12 facts."_

| ID  | Check                                       | Expected                                                                              |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| E1  | Table                                       | Styled table that fits the column; the conversation doesn't scroll sideways           |
| E2  | Code block                                  | Dark block with a language header and syntax colours                                  |
| E3  | Code copy icon                              | Copies exactly the code; the icon turns to a check                                    |
| E4  | LaTeX                                       | Typeset maths, no raw `\(` or `$` left                                                |
| E5  | Links in a reply                            | Primary colour; clicking opens a preview drawer with an open-in-new-tab button        |
| E6  | Follow-up buttons under the reply           | Clicking one sends it as your message (emoji included)                                |
| E7  | Image or video in a reply                   | Inline thumbnail; clicking opens a lightbox with Download and Copy link               |
| E8  | A reply with audio (`autoplay` on)          | An audio player after the reply finishes; it plays automatically for new replies only |
| E9  | Thumbs up/down (bots with feedback buttons) | Tooltips "Good Response" / "Bad Response"; clicking sends the feedback as a message   |

## F. Sources (needs a knowledge-base bot)

| ID  | Check                                          | Expected                                                                                       |
| --- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| F1  | Ask something answered from the knowledge base | A "Sources" section with a books icon under the reply                                          |
| F2  | Collapsed by default; `expanded=1`             | Collapsed until clicked; with `expanded=1` it starts open                                      |
| F3  | Source cards                                   | Title, favicon or type icon, `domain ⋅ page ⋅ [n]`; the row scrolls sideways if there are many |
| F4  | Click a card                                   | Opens the preview drawer (PDFs at the cited page); CSV opens a new tab                         |
| F5  | Inline `[1]` markers in the text               | Replaced by a small control that expands the cited source                                      |

## G. Tool calls

| ID  | Check                                                     | Expected                                                                        |
| --- | --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| G1  | After a tool run, the action row ends in "Used N tools ›" | Housekeeping calls (`load_tools`) are not counted                               |
| G2  | Open it                                                   | One bordered table, a row per call: icon, tool name, the search query beside it |
| G3  | Open a row                                                | Inputs and Output as monospace JSON; a "View tool call" link to the run         |
| G4  | Open the table mid-run, let the run finish                | Stays open, moves to the action row without animating again or jumping          |
| G5  | Open a table that is taller than the window               | The line you clicked stays visible at the top                                   |
| G6  | A reasoning model (`openai_responses` provider only)      | The action row reads "Thought · Used N tools ›"; opening shows the reasoning above the tool rows, clamped to five lines with "Show more…" |
| G7  | "Show more…" / "Show less"                                | Toggles the clamp. A summary short enough to fit shows no toggle at all         |
| G8  | `showToolCalls` off (the default)                         | No reasoning anywhere — it is run internals, like the calls themselves          |
| G9  | Reload and reopen the conversation from history           | The same label, and the panel still holds the reasoning (it is kept in IndexedDB, not refetched) |

## H. Action rows

| ID  | Check                  | Expected                                                                                              |
| --- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| H1  | Under a finished reply | Copy, debug (bug icon), run time and clock time (`13s · 2:07 PM`), then "Used N tools ›" if tools ran |
| H2  | Copy Message           | Pastes as formatted text in a doc (tables stay tables) and as plain text elsewhere                    |
| H3  | Debug link             | Opens the run on gooey.ai in a new tab                                                                |
| H4  | Older replies          | Their row appears on hover; the newest reply's row is always shown                                    |
| H5  | Hover your own message | Time, Copy and Edit (Re-run only in L)                                                                |

## I. Scrolling

Use a long reply: _"Without using any tools, write a 1500-word essay on the history
of dam engineering."_

| ID  | Check                             | Expected                                                                                                                        |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| I1  | While it streams                  | Once the reply outgrows the space below your question, the list follows it; the status line stays about 80px above the composer |
| I2  | Scroll up while it streams        | The list stays where you put it; the scroll-down button appears                                                                 |
| I3  | Tap the scroll-down button        | Jumps straight to the end and follows again                                                                                     |
| I4  | No scroll                         | The scroll-down button never appears on its own                                                                                 |
| I5  | The reply finishes while followed | No jump                                                                                                                         |
| I6  | Load an earlier conversation      | Its last question sits at the top                                                                                               |

## J. Editing and history

| ID  | Check                                                   | Expected                                                           |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| J1  | Edit your last message, change it, Send                 | The question and its reply are replaced in place by the new answer |
| J2  | Edit, then Esc or Cancel                                | Nothing changes                                                    |
| J3  | Sidebar                                                 | Conversations grouped by date, titled by their first question      |
| J4  | New Chat, then pick the old conversation in the sidebar | Empty state, then the old messages come back                       |
| J5  | Reload the page                                         | The sidebar still lists the conversations                          |
| J6  | Long message (over 5 lines)                             | Collapsed with an expand chevron                                   |

## K. Themes and layout

| ID  | Check                         | Expected                                                                                                 |
| --- | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| K1  | `theme=whatsapp`              | Wallpaper, bubbles with tails; the tools table, audio player and action-button hover are white, not grey |
| K2  | `theme=builder`               | Neutral surface; the send button is always visible                                                       |
| K3  | Phone width (popup or inline) | The popup fills the screen; the sidebar opens as an overlay and closes when you tap outside              |
| K4  | Wide inline                   | The sidebar opens beside the chat and can be closed                                                      |
| K5  | Reduced motion (OS setting)   | The status line is still text, no shimmer; the bot doesn't animate                                       |

## L. Host-driven widget (gooey.ai agent page)

| ID  | Check                                                        | Expected                                                                  |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| L1  | Run the agent                                                | The status line and tools behave as in D and G                            |
| L2  | Re-run on your last message, after scrolling up to it        | The new reply streams and the list follows it (I1)                        |
| L3  | Edit on your last message                                    | The host re-runs the edited question                                      |
| L4  | The page changes URL mid-run (`/new/…` → `/agent/?run_id=…`) | The widget keeps following; an open tools table closes (known, see below) |

## M. Sharing (gooey.ai `/chat/…` page only)

| ID  | Check                                              | Expected                                                        |
| --- | -------------------------------------------------- | --------------------------------------------------------------- |
| M1  | Share button in the header once there are messages | Opens "Share conversation" with a preview of the first exchange |
| M2  | Copy link / Open                                   | "Copied!"; Open loads the shared conversation in a new tab      |

## N. Errors

| ID  | Check                                         | Expected                                                                           |
| --- | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| N1  | A run that fails on the server                | The reply ends with the error in red; the composer works again                     |
| N2  | Block `api.gooey.ai` in devtools, then send   | Your message stays without a reply; the composer works again (no error text today) |
| N3  | Image upload fails (block `/__/file-upload/`) | The attachment disappears from the tray                                            |

## O. Accessibility

| ID  | Check                                                        | Expected                                                        |
| --- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| O1  | Tab through the header, composer and a reply                 | Every control is reachable and shows a focus ring               |
| O2  | Screen reader (VoiceOver) on the header and composer buttons | Each button has a short name, not the Font Awesome license text |

---

## Known issues

Last updated for 2.14.0. Remove what a release fixes; add what it finds.

Confirmed in testing:

- **Two widgets on one page share one stream** (`window.GooeyEventSource` is
  global). With both replying, Stop in the first leaves the second stuck on
  "Streaming" with Stop showing for good. The first's stream keeps running and
  overwrites that widget's earlier answer (A7). [#58](https://github.com/GooeyAI/gooey-web-widget/issues/58)
- **Links in replies have no `href`.** They take no keyboard focus and can't open
  in a new tab. Sites that refuse framing (e.g. usbr.gov) show a blank drawer.
- **Inline citations break the sentence.** Removing the `[n]` markers leaves a
  gap ("tall ."). One combined citation control sits at the end of the text
  run, and expanding it splits the sentence. [#59](https://github.com/GooeyAI/gooey-web-widget/issues/59)
- **Model reasoning can show in the answer while it streams** ("I'm thinking we
  need…"). **Server-side, and the widget cannot fix it.** `send_msg` already
  separates the reasoning (`daras_ai_v2/bots.py:265`, `parse_bot_html`) and
  discards it, but the delta is sliced *before* that parse (`:638`), so
  mid-reasoning chunks arrive with no `<think>` tag to strip — measured on a
  live `gpt_5_5` run. The fix is a `thinking` field on `MessagePart`, which is
  a few lines since the value is already in hand. Until then the reasoning
  still renders as the answer during the run and is replaced by the clean
  answer when `final_response` lands. **Confirmed live on production**: the
  release-test bot (`Kbo`, the default `id` above) reasons, and the same
  sentence was observed in the bubble mid-run and in the reasoning panel
  afterwards. It is not hypothetical and not limited to local models.
- **A network failure is silent** (N2): the question stays, no reply, no error. [#60](https://github.com/GooeyAI/gooey-web-widget/issues/60)
- **Location with geolocation blocked:** the error replaces the map, so there is
  no way to pick a place by hand, and Send stays disabled. [#61](https://github.com/GooeyAI/gooey-web-widget/issues/61)
- **The text fade replays** on every reply when a conversation loads from
  history.
- **Stop drops the question** and doesn't put its text back in the composer.
- **`mount` removes the target's first child**, and a fullscreen widget has no
  close button unless the host passes `onClose`.
- **`branding.colors.secondary`** is never read; only `primary` is used.
- **Sharing** shows only on gooey.ai `/chat/<name>-<integration id>` pages,
  whatever `enableShareConversation` says. The README doesn't say so.
- **An open tools table closes when gooey.ai rebuilds the widget** on its
  `/new` → `/agent` URL change (L4); the host replaces the widget.
- **The status stays on "Streaming N" until the reply is done** (gooey-server).
  The server reports a status for every chunk but the last, so the line holds
  the last "Streaming N" and the final chunk's text arrives only with the
  final response.
- **Replies begin with the model's per-step preambles** ("I'll search…").
  That is the server joining each step's text, not the widget.

Suspected from reading the code, not yet reproduced:

- A stream error before `conversation_start` lands on your own message, so no
  error is shown.
- Stop during the sending phase doesn't abort the request; the reply can arrive
  after its question was removed. (Stop during streaming was clean in 2.14.0.)
- On a non-HTTPS host page the mic button can blank the widget
  (`navigator.mediaDevices` is undefined).
- Enter during IME composition sends the message.
