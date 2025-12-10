## Cursor Rule: Gooey CSS Utilities

- Prefer the utility classes from `src/css/root.scss` instead of inline styles when adjusting spacing, layout, or typography.
- Breakpoints: `xs (0)`, `sm (640px)`, `md (1100px)`, `lg (1440px)`. Prefix utilities with the breakpoint to scope them (e.g., `md-flex-row`, `sm-gp-12`).
- Spacing: `g{p|pt|pr|pb|pl|m|mt|mr|mb|ml}-{val}` in px (0–100 range above). Use these for padding/margins before writing custom CSS.
- Flex/display/position: `d-flex`, `flex-row|col`, `align-*`, `justify-*`, `flex-1`, `flex-wrap`, `pos-relative|absolute|sticky|fixed`; responsive variants allowed.
- Typography: use `font_{size}_{weight}` helpers (e.g., `font_14_500`, `md-font_16_600`) and text helpers (`text-center|left|right`, `text-underline`, `text-decoration-none`, `text-capitalize`).
- Color tokens: `bg-*`, `text-*`, `b-*` from `colors.module.scss` (`primary`, `secondary`, `darkGrey`, `white`, `grey`, `light`, `lightGrey`, `muted`, `almostBlack`, `gooeyDanger`). Do not introduce new hex values unless necessary.
- Borders/radius/overflow: `b-1`, `b-btm-1`, `b-none`, `br-default|small|large|circle`, `overflow-hidden|y-auto|x-clip`.
- Shadows/animations: `bx-shadowA/B`, `anim-typing`, `anim-blink`, `circular-loader`, `text-reveal-container`; reuse before adding new effects.
- Layout helpers: `mw-760`, `h-header`, `cr-pointer`, scroll helpers `gooey-scroll-wrapper` / `gooey-scroll-container`.
- For tooltips, prefer `[data-tooltip]` attribute styling over ad-hoc tooltip CSS.
