# AGENTS.md

Base operating instructions for AI coding agents in this repository. Read this
before touching any file.

Companion documents — read the relevant one before you edit, do not duplicate
their content here:

| Document | Covers |
| --- | --- |
| [`docs/css-utilities.md`](docs/css-utilities.md) | The full utility class catalogue |
| [`.cursor/rules/css-utilities.md`](.cursor/rules/css-utilities.md) | Utility naming, breakpoints, colour tokens |
| [`.cursor/rules/architecture.md`](.cursor/rules/architecture.md) | Entry points, contexts, layout shell |
| [`README.md`](README.md) | The public config contract shipped to customers |

---

## 1. What this repository is

A single embeddable chat widget, built as **one IIFE bundle** (`dist/lib.js`) that
customers drop onto their own pages. That framing drives most of the rules below.

- **It renders inside a shadow root.** `renderCopilotChatWidget` calls
  `attachShadow` and mounts React into it. Host page CSS cannot reach in, and the
  widget's CSS cannot leak out.
- **All CSS ships in the bundle**, injected at runtime. There is no external
  stylesheet, so every byte of CSS is a byte every customer downloads.
- **It is deployed to third parties.** Anything that changes default appearance
  or behaviour is a change to every existing embed. Treat the default look as a
  public contract.
- **Multiple widgets can exist on one page** (`src/main.js` mounts two). Never
  assume a single instance, and never store per-widget state in a global.

### Where things live

```
src/lib.tsx                 public API — window.GooeyEmbed (mount/unmount)
src/widgets/index.tsx       shadow root, theme attribute, style injection
src/addStyles.tsx           CSS registry + cascade layers + adoptedStyleSheets
src/themes/                 theme ids, capability table, per-theme stylesheets
src/contexts/               SystemContext (layout/config), MessagesContext (chat)
src/components/shared/      cross-widget components (Buttons, Dialog, Popper, …)
src/widgets/copilot/        the chat widget itself (Header, Messages, ChatInput)
src/css/                    utility framework — see docs/css-utilities.md
```

---

## 2. Agent behaviour: ask before you touch

**Default to asking. This repository punishes guessing.** It has no test suite, a
broken lint script, and a visual surface that only a human can validate.

Ask the user — and wait — before you:

- Change anything that alters the **default theme's** appearance or behaviour.
- Add, remove, or rename a **theme**, or change any value in `THEME_CAPABILITIES`.
- Change the **public config contract** (`CopilotConfigType`, or anything
  documented in `README.md`).
- Change **layout primitives**: `AppLayout`, the sticky header/composer, the
  scroll container, or any `position`/`overflow`/`z-index` on a container.
- Delete or rewrite CSS you did not author, even when it looks dead.
- Add a dependency, or touch the build config.

Batch 2–4 specific questions with your recommendation for each. Do not ask
open-ended questions you could answer by reading the code.

You may proceed without asking for: typo fixes, renames with no behavioural
change, adding a comment, and changes the user has already explicitly specified.

### Diagnose before you change

When something looks wrong, find the mechanism first. State the root cause, then
fix that. **Do not add CSS until you can explain what is overriding what.** A
plausible-looking fix that treats a symptom is worse than no fix, because it
leaves the real cause in place and adds a rule nobody can later delete safely.

Prefer **deleting** the offending declaration over adding a counter-declaration.
Most layout bugs in this codebase have been one rule doing something unintended,
not a missing rule.

---

## 3. Styling rules

### 3.1 Inline styles are banned

**Never add `style={{ … }}` to a component.** Not for spacing, not for colour,
not for sizing, not "just this once", not to win a specificity fight.

The order you must work through:

1. An existing **utility class** — check [`docs/css-utilities.md`](docs/css-utilities.md) first.
2. A class in the **owning component's `.scss`** file, if no utility fits.
3. A **CSS custom property** when the value must vary by theme.
4. Inline style — **only** when the value is genuinely computed at runtime from
   data or measurement and cannot be expressed in a stylesheet.

The only legitimate remaining cases are things like a measured pixel height, a
drag offset, a progress percentage, or an SVG `fill` passed as a prop. If you
think you have a fifth case, ask.

When you do use one, add a comment on the same line saying why a class cannot
express it.

There are still ~97 inline styles across ~25 files. **This rule is
forward-looking**: do not add new ones, and remove any you happen to touch. Do
not launch a repo-wide cleanup unless asked.

### 3.2 Utilities before custom CSS

This codebase is **utility-first**. Before writing a rule, search `src/css/` for
a class that already does it. Add custom CSS only for genuinely bespoke visuals.

Every declaration you write must do something. Do not write:

- `box-sizing: border-box` — `App.css` already sets it via
  `.gooey-embed-container * :not(code *)`. Note that selector has a **descendant
  combinator**, so it matches elements **two or more levels deep**, not direct
  children of the embed container.
- `display: flex` / `align-items: center` / `padding: 8px` on a `<button>` — the
  base `button` rule in `buttons.scss` already sets all three.
- Resets for properties nothing sets. Check the base rule exists before
  overriding it.
- `!important` to beat a selector you already outrank. Compute specificity first.

### 3.3 `!important` is load-bearing here — know why before you fight it

Most utility families are generated **with `!important`**: spacing (`gp-*`,
`gm-*`), colours (`bg-*`, `text-*`, `b-*`), `br-*`, and most flex helpers. That
is deliberate — utilities are meant to win.

Consequences you must respect:

- A component or theme rule that needs to override a utility needs **both**
  higher specificity **and** `!important`.
- If a utility class on an element is going to be overridden by every theme,
  **remove the utility from the JSX** and declare the value per-theme instead.
  Do not leave a utility in place and fight it in three stylesheets.

### 3.4 Cascade layers

`src/addStyles.tsx` emits CSS in a **declared order**, not import order:

```
component  →  utility  →  theme
```

Later wins ties. So a `utility` rule beats a `component` rule of equal
specificity, and `theme` beats both. This is why the codebase is utility-first
and why theme sheets can restyle components without `!important` everywhere.

- Register stylesheets with the right layer:
  `addInlineStyle(style)` defaults to `component`; pass `"utility"` or `"theme"`
  explicitly for those.
- **Register every stylesheet at module scope.** The shared constructable
  stylesheet is built once on first mount; CSS registered later will not reach an
  already-adopted sheet.

---

## 4. Theme rules (strict)

Three themes: **`default`**, **`whatsapp`**, **`builder`**. `default` is what
every existing customer sees.

### 4.1 The mechanism

`src/widgets/index.tsx` puts both a class and an attribute on the embed root:

```
<div class="gooey-embed-container gooey-chat-theme" data-gooey-theme="default">
```

Every theme rule must be scoped to that attribute:

```scss
.gooey-chat-theme[data-gooey-theme="whatsapp"] {
  /* … */
}
```

`resolveTheme()` guarantees the attribute is always one of the three ids, so
`[data-gooey-theme="default"]` is a safe hook for default-only rules.

### 4.2 Rules

1. **Never change shared CSS to suit one theme.** If a theme needs a different
   value, the shared rule reads a custom property with the **current value as the
   fallback**, and the theme overrides the property:

   ```scss
   /* component stylesheet — unchanged for default */
   .thing { background: var(--gooey-thing-bg, #f5f5f5); }

   /* theme stylesheet */
   .gooey-chat-theme[data-gooey-theme="whatsapp"] { --gooey-thing-bg: #fff; }
   ```

   This is the single most important rule in this file. A shared rule edited for
   one theme is a regression shipped to every customer.

2. **Default-theme parity is non-negotiable.** After any theme work, the default
   theme must render **byte-identically** to before. Verify it — do not assume.

3. **Theme stylesheets restyle; they do not restructure.** A theme may not add or
   remove DOM. Anything structural goes in `THEME_CAPABILITIES`
   (`src/themes/index.ts`) and is read via `themeCapabilities(config.theme)`.
   Never write `config.theme === "whatsapp"` in a component.

4. **`THEME_CAPABILITIES` is a total `Record<ThemeId, …>` on purpose.** Adding an
   id to `THEME_IDS` without a capability entry is a compile error. Keep it that
   way. Adding a theme also requires an `addInlineStyle(x, "theme")` registration
   in `src/widgets/index.tsx` — this is **not** compile-checked, so do it
   deliberately.

5. **Do not reset styles a theme never applies.** Before writing
   `background: transparent` or `box-shadow: none` in a theme, confirm a base
   rule actually sets it. Several classes are styled by exactly one theme, so
   another theme "resetting" them is dead code.

6. **Colour tokens, then theme variables, then hex.** Use `colors.module.scss`
   tokens. Within a theme, define semantic variables
   (`--gooey-whatsapp-incoming`) and reference them. Raw hex is a last resort.

7. **Watch the asset cost.** Theme assets are inlined as data URIs into the one
   bundle every customer downloads, **regardless of which theme they use**. The
   WhatsApp wallpaper alone is ~417KB of a ~3.5MB bundle. Do not add large theme
   assets without raising it first. A literal `url()` is inlined **per
   occurrence** — declare it once as a custom property and reference that.

---

## 5. Shadow DOM and layout landmines

Verified traps. Read this section before touching layout.

- **Portals mount into `.gooey-embed-container`.** `Popper` and `Dialog` use
  `ShadowRootContext` to portal there, which keeps them inside
  `.gooey-chat-theme` so theme rules apply. Do not portal to `document.body` —
  it escapes both the shadow root's styles and the theme scope.
- **`.gooey-messages-container` is an unintended horizontal scroll container.**
  It carries `overflow-y-auto` and never declares `overflow-x`, and CSS computes
  `overflow-x: visible` → `auto` when the other axis is not `visible`. So **any**
  descendant wider than the message column scrolls the whole conversation
  sideways instead of being contained. If content can overflow, bound it at its
  own level.
- **A `max-width: 100%` scroller is only bounded if every ancestor up to the
  column is full-width.** Taking an intermediate wrapper out of `stretch` (e.g.
  `align-items: flex-start` on a flex column) silently re-parents that
  percentage.
- **z-index:** `.gooey-chat-header` is `z-index: 1` and should stay the highest
  in the chat chrome. The composer is `position: sticky`, so it already paints
  above static message content **without** a z-index — do not give it one, or it
  outranks the header. Prefer positioned-vs-static ordering over z-index.
- **`rem` resolves against the host page's root font size**, not the widget.
  Prefer `px` for widget internals.
- **Viewport media queries are usually wrong here.** An inline embed can be 380px
  wide on a 1440px page. Use `layoutController.isNarrowWidth` from
  `SystemContext` for widget-relative behaviour.

---

## 6. Verification — required before you claim anything works

There is **no test suite**, and `npm run lint` is **broken** on all branches
(`.eslintrc.cjs` references `eslint-plugin-react`, which is not installed). Do
not report lint or test results you did not obtain.

Minimum for any change:

```bash
npx tsc --noEmit
```

For any stylesheet change, also compile it and inspect the emitted CSS rather
than trusting the edit:

```bash
npx sass --load-path=. --no-source-map src/path/to/file.scss > /dev/null
SENTRY_AUTH_TOKEN="" npx vite build
```

Then grep `dist/lib.js` to confirm the rule you intended actually won the
cascade. Specificity reasoning is not verification.

**`npm run build` uploads source maps to Sentry** when `SENTRY_AUTH_TOKEN` is in
the environment (`.env`). Always blank it for local verification builds, as above.

### Visual changes need human eyes

You cannot verify appearance. For any change to geometry, colour, or stacking,
state plainly that it is unverified and ask the user to look. Never describe a
layout change as confirmed on the basis of reading CSS.

### Dev server gotcha

Vite serves **stale compiled CSS** for `?inline` imports after a branch switch —
files that existed when the server started keep their old content while new files
compile fresh. This looks exactly like a real styling bug. If styles seem wrong
or a change has no effect:

```bash
rm -rf node_modules/.vite && npm run dev
```

---

## 7. Scope and communication

- Do the task asked. Do not expand it, refactor adjacent code, or "improve"
  files you were not asked to touch. Note opportunities instead.
- Report faithfully. If something is unverified, blocked, or skipped, say so
  explicitly and say why.
- Keep commits focused. This repo uses conventional commits with a detailed body
  explaining **why** each change was made — match that style. Do not mix
  behavioural fixes, cleanup, and docs in one commit without saying so.
- `docs/superpowers/` is gitignored. Never commit planning notes, scratch files,
  or anything containing absolute local paths.
