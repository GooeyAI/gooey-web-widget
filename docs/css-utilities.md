## Gooey CSS Utility Framework

Lightweight utility classes sourced from `src/css/root.scss` and its includes. Breakpoints: `xs (0)`, `sm (640px)`, `md (1100px)`, `lg (1440px)`. Prefix any class with the breakpoint key to scope it (e.g., `md-flex-row`).

### Spacing
- `g{p|pt|pr|pb|pl|m|mt|mr|mb|ml}-{val}` where `val` ∈ `[0,2,4,5,6,8,10,12,15,16,18,20,22,24,25,26,28,30,32,34,36,40,44,46,48,50,52,60,64,70,76,80,96,100]`. Units px. Example: `gp-16`, `md-mt-24`.
- `my-auto` centers via auto vertical margins.

### Sizing
- `w-{20|50|60|80|100|auto}` / `h-{...}` set %/auto; responsive variants allowed.

### Display & Position
- `d-{flex|block|none|inline-block}` plus responsive variants.
- `pos-{relative|absolute|sticky|fixed|static|initial|unset}`.

### Flexbox
- Direction: `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`.
- Wrapping: `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`.
- Growth: `flex-fill`, `flex-1`, `flex-grow-{0|1}`, `flex-shrink-{0|1}`.
- Align/justify (self & content): `justify-*`, `align-*`, `align-self-*`, `align-content-*`; responsive forms available.

### Typography
- `font_{size}_{weight}` classes (px + font-weight). Examples: `font_14_500`, `font_16_700`, `font_24_600`, up to `font_64_600`. Responsive: `md-font_16_600`, etc.
- Text helpers: `text-center|left|right`, `text-underline`, `text-lowercase`, `text-decoration-none`, `text-capitalize`, `translucent-text`, `hover-underline`.

### Color
- From `colors.module.scss`: `bg-{primary|secondary|darkGrey|white|grey|light|lightGrey|muted|almostBlack|gooeyDanger}`; `text-*` counterparts; `b-*` border colors.
- Responsive color helpers: `sm-bg-primary`, `md-text-muted`, etc.

### Borders & Radius
- Borders: `b-1`, `b-btm-1`, `b-top-1`, `b-rt-1`, `b-lt-1`, `b-none`.
- Radius: `br-default (8px)`, `br-small (4px)`, `br-large (16px)`, `br-circle`, `br-large-right/left`.

### Overflow & Layout
- `overflow-hidden|scroll|y-auto|x-clip|x-hidden`.
- Width helpers: `mw-100`, `mw-760` (centered), `h-header` (56px).
- Sticky helpers: `top-0`, `left-0`, `right-0`, `cr-pointer`.
- Scroll wrappers: `gooey-scroll-wrapper`, `gooey-scroll-container` (hides scrollbar, normalizes on tablet).

### Display utilities
- `d-flex` pairs with flex classes; combine with spacing: `d-flex align-center justify-between gp-12`.

### Shadows & Effects
- Shadows: `bx-shadowA`, `bx-shadowB`.
- Animations: `anim-typing`, `anim-blink`, `anim-blink-self`, `text-reveal-container`, `circular-loader`, `anim-typing` keyframes; `popup`, `rotate` keyframes available.
- Special: `blur-edges`, `stroke-white`.

### Tooltips (data attribute)
- `[data-tooltip]` base plus hover styles built in. Set `data-tooltip="Hint"` on element; positioning left-of element.

### Usage Patterns
- Compose utilities in JSX className strings: `className="d-flex flex-col gp-16 bg-white br-default bx-shadowA"`.
- Prefer responsive prefixes for layout shifts instead of custom media queries.
- Colors use design tokens from `colors.module.scss`; align new components to these tokens before adding new colors.

### Notes
- Global reset and typography live in `src/css/App.css` (box-sizing, fonts, scrollbar).
- Breakpoint prefixes match Bootstrap-ish naming but map to 0/640/1100/1440 widths—verify before copying snippets.
