## Cursor Rule: Gooey CSS Utilities

Full catalogue: [`docs/css-utilities.md`](../../docs/css-utilities.md).
Behavioural rules and the theme contract: [`AGENTS.md`](../../AGENTS.md).
This file is the working reference for writing styles.

### Order of preference — no exceptions

1. An existing **utility class** from `src/css/`.
2. A class in the **owning component's `.scss`**, if no utility fits.
3. A **CSS custom property**, when the value must differ per theme.
4. An **inline style** — only when the value is genuinely computed at runtime
   from data or measurement and cannot be expressed in a stylesheet.

**Inline styles are effectively banned.** Never add `style={{ … }}` for spacing,
colour, sizing, or to win a specificity fight. The only legitimate cases are a
measured pixel height, a drag offset, a progress percentage, or an SVG `fill`
passed as a prop. When you must, comment on the same line saying why a class
cannot express it. Roughly 97 inline styles remain across ~25 files — the rule is
forward-looking: add none, remove any you touch, do not start a repo-wide sweep
unless asked.

### Cascade layers — how a rule actually wins

`src/addStyles.tsx` emits CSS in a **declared** order, not import order:

```
component  →  utility  →  theme
```

Later wins ties. So at equal specificity a utility beats a component rule, and a
theme beats both. This is why the codebase is utility-first and why theme sheets
can restyle components without `!important` everywhere.

Register with the right layer: `addInlineStyle(css)` defaults to `component`;
`"utility"` and `"theme"` are passed explicitly in `src/widgets/index.tsx`. Always
register at module scope — the shared stylesheet is built once on first mount.

### `!important` is load-bearing — check before you fight it

Most utility families are generated **with `!important`**: spacing (`gp-*`,
`gm-*`), colours (`bg-*`, `text-*`, `b-*`), `br-*`, and most flex helpers. That is
deliberate; utilities are meant to win.

- To override a utility you need **both** higher specificity **and** `!important`.
- Theme selectors like `.gooey-chat-theme[data-gooey-theme="whatsapp"] .thing`
  are `(0,3,0)`, which already beats a bare `.thing:focus` `(0,2,0)` and `.b-1`
  `(0,1,0)` — do **not** add `!important` there out of habit. Compute specificity
  first.
- If every theme is going to override a utility on an element, **remove the
  utility from the JSX** and declare the value per theme instead. Do not leave it
  in place and fight it in three stylesheets.

### Every declaration must do something

Do not write these — they are already provided and were removed once:

- `box-sizing: border-box` — `src/css/App.css` sets it via
  `.gooey-embed-container * :not(code *)`. That selector has a **descendant
  combinator**, so it matches elements **two or more levels deep**, not direct
  children of the embed container.
- `display: flex`, `align-items: center`, `padding: 8px`, `border-radius: 8px` on
  a `<button>` — the base `button` rule in `buttons.scss` sets all four.
- `flex`, `width: auto`, `min-width`/`min-height` alongside an explicit
  `width`/`height`, or `aspect-ratio` on an element that is already square and
  absolutely positioned.
- Resets for properties nothing sets. Before writing `background: transparent` or
  `box-shadow: none`, confirm a base rule actually applies one — several classes
  are styled by exactly one theme, so another theme "resetting" them is dead code.
- A second `!important` to beat a selector you already outrank.

### Theme rules

Themes are scoped by an attribute on the embed root, which always carries a valid
id (`resolveTheme` guarantees it), so `[data-gooey-theme="default"]` is a safe
hook for default-only rules:

```scss
.gooey-chat-theme[data-gooey-theme="whatsapp"] { /* … */ }
```

**Never edit a shared rule to suit one theme.** The shared rule reads a custom
property with the **current value as the fallback**; the theme overrides the
property. This keeps the default theme byte-identical:

```scss
/* component stylesheet — default unchanged */
.thing { background: var(--gooey-thing-bg, #f5f5f5); }

/* theme stylesheet */
.gooey-chat-theme[data-gooey-theme="whatsapp"] { --gooey-thing-bg: #fff; }
```

Themes **restyle, they do not restructure** — no adding or removing DOM. Anything
structural belongs in `THEME_CAPABILITIES` (`src/themes/index.ts`), read via
`themeCapabilities(config.theme)`. Never `config.theme === "whatsapp"` in a
component.

### Utility reference

- **Breakpoints:** `xs (0)`, `sm (640)`, `md (1100)`, `lg (1440)`. Prefix to scope
  (`md-flex-row`, `sm-gp-12`). These are **viewport** widths — an inline embed can
  be 380px wide on a 1440px page, so for widget-relative behaviour use
  `layoutController.isNarrowWidth` from `SystemContext`, not a breakpoint.
- **Spacing:** `g{p|pt|pr|pb|pl|m|mt|mr|mb|ml}-{px}`. Use before any custom
  padding/margin.
- **Flex / display / position:** `d-flex`, `flex-row|col`, `align-*`, `justify-*`,
  `flex-1`, `flex-wrap`, `pos-relative|absolute|sticky|fixed`; responsive variants
  allowed.
- **Typography:** `font_{size}_{weight}` (`font_14_500`, `md-font_16_600`) and
  `text-center|left|right`, `text-underline`, `text-decoration-none`,
  `text-capitalize`.
- **Colour tokens:** `bg-*`, `text-*`, `b-*` from `colors.module.scss` —
  `primary`, `secondary`, `darkGrey`, `white`, `grey`, `light`, `lightGrey`,
  `muted`, `almostBlack`, `gooeyDanger`. Prefer tokens, then theme variables, then
  raw hex as a last resort.
- **Borders / radius / overflow:** `b-1`, `b-btm-1`, `b-none`,
  `br-default|small|large|circle`, `overflow-hidden|y-auto|x-clip`.
- **Shadows / animations:** `bx-shadowA/B`, `anim-typing`, `anim-blink`,
  `circular-loader`, `text-reveal-container` — reuse before adding new effects.
- **Layout helpers:** `mw-760`, `h-header`, `cr-pointer`, and the scroll pair
  `gooey-scroll-wrapper` (clips) / `gooey-scroll-container` (`overflow: auto`,
  `max-width: 100%`).
- **Tooltips:** prefer the `[data-tooltip]` attribute styling over ad-hoc CSS.

### Units and layout gotchas

- **Use `px` for widget internals.** `rem` resolves against the **host page's**
  root font size, which the customer controls.
- `.gooey-messages-container` is an **unintended horizontal scroll container** —
  `overflow-y-auto` with no `overflow-x` makes CSS compute `overflow-x: auto`. Any
  descendant wider than the message column scrolls the whole conversation
  sideways. Bound overflowing content at its own level.
- A `max-width: 100%` scroller is only bounded while every ancestor up to the
  message column is full-width. Taking a wrapper out of `stretch` re-parents that
  percentage.
- **z-index:** `.gooey-chat-header` is `z-index: 1` and should stay the highest in
  the chat chrome. The composer is `position: sticky` and already paints above
  static content without a z-index; giving it one outranks the header. Prefer
  positioned-vs-static ordering.
- Theme assets are inlined as data URIs into the one bundle **every** customer
  downloads, whatever theme they use — the WhatsApp wallpaper alone is ~417KB of
  ~3.5MB. A literal `url()` is inlined **per occurrence**, so declare it once as a
  custom property and reference that.

### Verifying a style change

Specificity reasoning is not verification. Compile the sheet, build, then grep the
output to confirm your rule won:

```bash
npx sass --load-path=. --no-source-map src/path/to/file.scss > /dev/null
SENTRY_AUTH_TOKEN="" npx vite build   # blank the token: `npm run build` uploads to Sentry
grep -o '\.your-selector{[^}]*}' dist/lib.js
```

You cannot verify appearance. For any change to geometry, colour, or stacking, say
plainly that it is unverified and ask for human review.

If the dev server shows stale styles after a branch switch (a real and recurring
trap — Vite caches `?inline` results):

```bash
rm -rf node_modules/.vite && npm run dev
```
