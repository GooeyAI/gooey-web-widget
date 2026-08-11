## Cursor Rule: Repo Architecture Map

Behavioural rules (ask-before-touching, inline-CSS ban, theme rules, verification)
live in [`AGENTS.md`](../../AGENTS.md). This file is the code map only.

### The shape of the thing

One embeddable chat widget, built as a **single IIFE bundle** (`dist/lib.js`) that
customers load onto their own pages. Consequences that shape everything:

- It mounts into a **shadow root**, so host CSS cannot reach in and widget CSS
  cannot leak out.
- **All CSS ships inside the bundle** and is injected at runtime. There is no
  external stylesheet, so every CSS byte is downloaded by every customer.
- `vite.config.ts` builds one IIFE with `inlineDynamicImports: true`, so dynamic
  imports do **not** split — everything lands in one file. Assets under the inline
  limit become data URIs.
- **Multiple widgets can share a page** (`src/main.js` mounts two). Never assume a
  single instance; never keep per-widget state in a global.

### Boot path

```
src/main.js            local dev harness — mounts #popup and #inline
  └─ src/lib.tsx       public API: GooeyEmbedFactory on window.GooeyEmbed
     │                 .mount(config, controller?) / .unmount()
     │                 validates config.target and config.integration_id
     └─ src/widgets/index.tsx
        │              attachShadow({mode:"open", delegatesFocus:true})
        │              ReactDOM.createRoot(shadowRoot) inside <React.StrictMode>
        │              applies config defaults, resolveTheme(config.theme)
        │              renders .gooey-embed-container.gooey-chat-theme
        │                with data-gooey-theme and --gooey-brand-primary
        └─ src/widgets/copilot/index.tsx   ChatWidget — switches on config.mode
           ├─ popup       → WithFabLauncher (renders launcher when closed,
           │                widget when open) → CopilotWidget
           ├─ inline      → CopilotWidget isInline
           └─ fullscreen  → .gooey-fullscreen > CopilotWidget isInline
              └─ components/widget/index.tsx
                 └─ AppLayout > [ SideNavbar, Header, Messages, ChatInput,
                                  SecondaryDrawer ]
```

`src/widgets/index.tsx` **mutates the config object** while applying defaults
(`config.theme`, `config.branding.*`). Both it and `src/lib.tsx` are the only
places that should normalise config.

### Styling pipeline — `src/addStyles.tsx`

Read this before touching any stylesheet import.

- `addInlineStyle(css, layer)` registers a stylesheet in a **module-scoped**
  `Map` keyed by the CSS text. Not on `globalThis` — two bundles on one page must
  not share a mutable registry.
- `STYLE_LAYERS = ["component", "utility", "theme"]`. CSS is emitted in that
  order, so **later wins ties**: utilities beat components, themes beat both.
  Layer is declared, not derived from import order.
- Default layer is `component`. `src/widgets/index.tsx` registers `root.scss` as
  `"utility"` and each theme sheet as `"theme"`.
- `<Styles shadowRoot={…} />` adopts **one shared constructable stylesheet**
  across all widget instances, falling back to an inline `<style>` where
  `adoptedStyleSheets` is unavailable (Safari < 16.4). A failed adoption flips
  state in a layout effect so the fallback renders before paint.
- **Register stylesheets at module scope.** The shared sheet is built once on
  first mount; CSS registered later will not reach an already-adopted sheet.
- Stylesheets live next to the component that owns them and are imported with
  `?inline`. See the `*.scss` files under `src/components/` and
  `src/widgets/copilot/components/`.

### Themes — `src/themes/`

- `index.ts` — `THEME_IDS = ["default", "whatsapp", "builder"]`, the `ThemeId`
  type, `isThemeId` predicate, `resolveTheme` (unknown → `"default"`), the
  `ThemeCapabilities` interface, and `THEME_CAPABILITIES` as a **total**
  `Record<ThemeId, ThemeCapabilities>`.
- `whatsapp.scss`, `builder.scss` — visual layers, each scoped to
  `.gooey-chat-theme[data-gooey-theme="<id>"]`. `default` has no sheet; it is the
  base look, with default-only overrides living in component sheets under
  `[data-gooey-theme="default"]`.
- **Structural differences go in `THEME_CAPABILITIES`, never in a component
  condition.** Read them via `themeCapabilities(config?.theme)`. Current
  capabilities: `inputMinHeight`, `floatingNewChat`, `alwaysShowSendButton`.
- Adding a theme needs an id, a capability entry (compile-enforced), a stylesheet,
  and an `addInlineStyle(x, "theme")` call in `src/widgets/index.tsx` (**not**
  compile-enforced).

### Contexts

- `src/contexts/SystemContext.tsx` — owns config plus `layoutController`:
  state `isOpen`, `isInline`, `isFocusMode`, `isSidebarOpen`, `isNarrowWidth`,
  `isGooeyChatApp`, and the flags `showCloseButton`, `showSidebarButton`,
  `showFocusModeButton`; actions `toggleOpenClose`, `toggleSidebar`,
  `toggleFocusMode`, `toggleSecondaryDrawer`. `isNarrowWidth` comes from
  `useDeviceWidth` and measures the **widget container**, not the viewport — use
  it instead of a media query for widget-relative behaviour.
- `src/contexts/MessagesContext.tsx` — chat state and streaming: `messages`,
  `isSending`, `isReceiving`, `isMessagesLoading`, `latestMessageIds`,
  `currentConversation`, and the actions `initializeQuery`, `editQuery`, `rerun`,
  `handleNewConversation`, `cancelApiCall`. Conversation persistence lives in
  `ConversationLayer`.
- `src/contexts/types.ts` — `CopilotConfigType`, the **public config contract**.
  Changing it changes what customers can pass; keep `README.md` in step.
- `src/contexts/ShadowRootContext.tsx` — supplies the shadow root to code that
  needs to portal or query inside it.
- Consume contexts through `src/contexts/hooks.tsx`
  (`useSystemContext`, `useMessagesContext`).

### Layout shell

- `src/components/shared/Layout/AppLayout.tsx` — picks the container class
  (`gooey-popup` / `gooey-focused-popup` / `gooey-inline-container` /
  `gooey-fullscreen-container`), then renders `SideNavbar`, `<main
  class="gooey-chat-main">` with `Header` + children, and `SecondaryDrawer`.
  **`config.showHeader === false` removes the header *and* the sidebar** — and
  with them every close/expand control, including the button for a host's own
  `onClose`.
- `Header` (`src/widgets/copilot/components/Header/index.tsx`) owns the sidebar
  toggle, focus mode, close, share dialog, and the inline-mode new-chat button.
- `Messages` owns the scroll container plus two floating controls
  (scroll-to-bottom, and the new-chat button gated on `floatingNewChat`).
  Scroll behaviour is in `useMessagesScroll.ts`.
- `ChatInput` owns the composer, `GooeyTextArea` (auto-grow, `minHeight` driven
  by `THEME_CAPABILITIES`), `FilePreview`, `InlineAudioRecorder`, and — note —
  renders `PlaceholderMessage` for the empty state.

### Portals and the shadow root

`Popper` and `Dialog` portal into `.gooey-embed-container` via
`ShadowRootContext`. That is deliberate: it keeps them inside `.gooey-chat-theme`
so theme rules apply. **Never portal to `document.body`** — it escapes both the
shadow root's styles and the theme scope.

### Shared modules worth knowing

- `src/widgets/copilot/components/constants.ts` — `CHAT_INPUT_ID`,
  `MESSAGE_GUTTER`. Lives here so `MessagesContext` can read an id without
  importing the component tree that owns it (that import was a cycle:
  MessagesContext → ChatInput → Messages → MessagesContext). Put cross-component
  constants here, not on a component barrel.
- `src/components/shared/Response/` — `parseResponseBody` (marked → LaTeX →
  `html-react-parser` with `domHandlers`), `hasResponseText`, `ResponseData`.
- `src/api/streaming.ts` (`STREAM_MESSAGE_TYPES`, SSE handling) and
  `src/api/file-upload.ts`.

### Known layout landmines

- **`.gooey-messages-container` is an unintended horizontal scroll container.** It
  carries `overflow-y-auto` and never declares `overflow-x`; CSS computes
  `overflow-x: visible` → `auto` when the other axis is not `visible`. Any
  descendant wider than the message column therefore scrolls the whole
  conversation sideways instead of being contained.
- **A `max-width: 100%` scroller is only bounded while every ancestor up to the
  message column is full-width.** Taking an intermediate wrapper out of `stretch`
  (e.g. `align-items: flex-start` on a flex column) silently re-parents that
  percentage and lets content escape.
- **z-index:** `.gooey-chat-header` is `z-index: 1` and should remain the highest
  in the chat chrome. The composer is `position: sticky`, so it already paints
  above static message content **without** a z-index — giving it one outranks the
  header (and `PlaceholderMessage` renders inside the composer). Prefer
  positioned-vs-static ordering over z-index.

### Build and verification

- `npm run build` = `tsc && vite build`. It **uploads source maps to Sentry** when
  `SENTRY_AUTH_TOKEN` is set (it is, via `.env`). Use
  `SENTRY_AUTH_TOKEN="" npx vite build` for local verification.
- **No test suite exists.** `npm run lint` is **broken** on all branches —
  `.eslintrc.cjs` references `eslint-plugin-react`, which is not in
  `devDependencies`. Do not report lint or test results you did not obtain.
- The Vite dev server serves **stale compiled CSS** for `?inline` imports after a
  branch switch. If styles look wrong or an edit has no effect:
  `rm -rf node_modules/.vite && npm run dev`.

### Start here when changing…

| Task | Files |
| --- | --- |
| Embedding / public API | `src/lib.tsx`, `src/widgets/index.tsx`, `src/contexts/types.ts`, `README.md` |
| Theme visuals | `src/themes/*.scss` + the owning component's `.scss` |
| Theme structure | `src/themes/index.ts` (`THEME_CAPABILITIES`) |
| CSS delivery / cascade | `src/addStyles.tsx` |
| Layout / chrome | `AppLayout.tsx`, `appLayout.scss`, `Header/` |
| Chat state / streaming | `MessagesContext.tsx`, `src/api/streaming.ts` |
| Composer | `ChatInput/index.tsx`, `chatInput.scss`, `GooeyTextArea.tsx` |
| Message rendering | `Messages/`, `src/components/shared/Response/` |
