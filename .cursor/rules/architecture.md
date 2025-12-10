## Cursor Rule: Repo Architecture Map

- Entry points: `src/main.js` mounts `GooeyEmbed` twice (popup/inline) with a default config. `src/lib.tsx` (not opened yet) likely exports the embed API.
- Contexts:
  - `src/contexts/SystemContext.tsx`: owns layout state (open/close, focus mode, sidebar, secondary drawer), device breakpoints, temp store, and passes config. Uses `useDeviceWidth` and DOM width tweaks via `shadowRoot` selectors (`#gooey-side-navbar`, `#gooey-right-bar`).
  - `src/contexts/MessagesContext.tsx`: chat/message state, streaming, conversations, cancel/send, scroll refs. Share dialog logic now lives in Header, not here.
- Layout shell: `src/components/shared/Layout/AppLayout.tsx` wraps Header, SideNavbar, SecondaryDrawer, applies container classes; uses SystemContext layout flags (inline/fullscreen/focus).
- Header: `src/widgets/copilot/components/Header/index.tsx` handles UI controls and share dialog locally (builds share URL from `currentConversation?.id`, manages dialog state).
- Dialogs: reusable `src/components/shared/Dialog.tsx` (with `dialog.scss`) renders portal inside `.gooey-embed-container`, uses utility classes for spacing/flex/text.
- CSS utilities: `src/css/root.scss` aggregates spacing/sizing/flex/colors/etc. Prefer utility classes (`gp-*`, `d-flex`, `font_*`, `bg-*`, `text-*`, etc.) over inline styles; see `docs/css-utilities.md` and `.cursor/rules/css-utilities.md`.
- Embed container: `.gooey-embed-container` defined in `src/css/App.css` sets global box sizing, fonts, anchor styles.
- Shadow root: `ShadowRootContext` used by Popper/Dialog to portal into `gooey-embed-container` when mounted inside a shadow DOM.

Use these files first when adjusting layout, state, or embedding: `src/main.js`, `src/lib.tsx` (entry), `SystemContext`, `MessagesContext`, `AppLayout`, `Header`, `Dialog`.
