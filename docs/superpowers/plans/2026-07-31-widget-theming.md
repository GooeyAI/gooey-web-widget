# Gooey Web Widget Theming Implementation Plan

> **For agentic workers:** Execute one checkpoint at a time. After automated verification, stop and wait for the user's manual approval before continuing.

**Goal:** Add multiple visual themes directly to the existing Gooey Web Widget while preserving its current controller, contexts, Shadow DOM, public API, and default appearance.

**Architecture:** The existing widget remains the only chat implementation. Current context-coupled components are incrementally divided into behavior adapters and internal presentation slots. A theme registry selects layout, header, empty-state, message, composer, and icon presentations; scoped SCSS and semantic CSS variables style them inside the Shadow DOM.

**Tech Stack:** React 18, TypeScript, SCSS, CSS custom properties, Vite IIFE build, Shadow DOM, Vitest/Testing Library, Django/Python, existing Gooey Server controller integration.

## Global Constraints

- Work from the current `master` widget architecture.
- Preserve `window.GooeyEmbed`, `GooeyEmbed.mount(config, controller?)`, `defaultConfig`, and `unmount()`.
- Preserve `SystemContext`, `MessagesContext`, `CopilotChatWidgetController`, widget-owned streaming, and controller-owned server behavior.
- Omitting `theme` must preserve the current appearance and behavior.
- Keep the external widget on the default theme.
- Enable WhatsApp only for the Gooey Server VideoBots preview.
- Themes contain presentation only. They must not call APIs, mutate conversations, parse server wire data, upload files, or own streaming.
- Theme selection must be serializable; do not expose arbitrary React components or CSS strings through public config.
- Continue using SCSS. Use CSS variables only for values that must vary at runtime.
- Keep every theme selector scoped beneath the widget theme root inside the Shadow DOM.
- Do not hide interactive regions with CSS. If a region is omitted, it must not be mounted.
- Keep dialogs, menus, and media viewers in the correct themed Shadow DOM.
- Do not publish, deploy, tag, push, or commit unless the user explicitly requests it.

## Manual-Approval Protocol

For every checkpoint:

1. Add focused automated coverage first.
2. Run focused tests, lint, typecheck, and the relevant build.
3. Provide the user with an exact local URL and a short manual test script.
4. Stop and wait for approval.
5. Fix findings inside the same checkpoint and repeat its checks.

No later checkpoint begins until the current checkpoint is manually approved.

---

## Checkpoint 0: Add a Test and Visual Baseline Harness

**Purpose:** Capture the current widget before changing its architecture.

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/widget-mount.test.tsx`
- Create: `tests/controller-contract.test.tsx`
- Modify: `src/main.js`
- Modify: `index.html`

**Steps:**

- [ ] Add the root test runner and DOM testing utilities required for React component and Shadow DOM tests.
- [ ] Add a mount test for inline, popup, and fullscreen modes.
- [ ] Add a controller characterization test for messages, send, new conversation, rerun, config update, and conversation update.
- [ ] Add a development-only URL switch for inline, popup, fullscreen, and dual-mount views.
- [ ] Add representative development messages covering user, assistant, loading, media, sources, tools, buttons, and errors without changing production defaults.
- [ ] Run the new tests, `npm run lint`, and `npm run build`.
- [ ] Start `npm run dev` and capture baseline screenshots at mobile and desktop widths.

**Manual checkpoint 0:**

The user verifies:

- Inline, popup, and fullscreen modes mount.
- Empty and populated conversations match the current expected UI.
- Send, stop, new conversation, edit, upload, audio, sources, and rerun work where enabled.
- Popup close, reopen, and focus mode work.

**Acceptance:** The user approves the baseline screenshots and identifies any existing defects that must not be mistaken for theming regressions.

---

## Checkpoint 1: Introduce Theme Identity and Default Resolution

**Purpose:** Add theme selection without changing rendering.

**Files:**

- Create: `src/themes/types.ts`
- Create: `src/themes/registry.ts`
- Create: `src/themes/ThemeProvider.tsx`
- Create: `src/themes/hooks.ts`
- Create: `src/themes/default/index.ts`
- Modify: `src/contexts/types.ts`
- Modify: `src/contexts/SystemContext.tsx`
- Modify: `src/widgets/index.tsx`
- Modify: `src/main.js`
- Create: `tests/themes/theme-registry.test.tsx`
- Create: `tests/themes/theme-root.test.tsx`

**Behavior:**

- Add optional `theme` configuration with `default` and `whatsapp` built-in IDs.
- Resolve omitted and unknown IDs to `default`.
- Emit a development warning for an unknown ID without breaking the widget.
- Add `.gooey-chat-theme` and `data-gooey-theme="default"` to the existing embed root.
- Allow `controller.updateConfig` to receive partial config and preserve nested branding.
- Re-resolve the theme when config changes, without remounting the React root.

**Automated verification:**

- [ ] Omitted theme resolves to default.
- [ ] Explicit default resolves identically.
- [ ] Unknown theme safely falls back.
- [ ] The theme attribute exists inside the Shadow DOM.
- [ ] Partial config updates preserve all unrelated values.
- [ ] Two mounted widgets resolve themes independently.
- [ ] Run focused tests, full tests, lint, and build.

**Manual checkpoint 1:**

The user compares default inline, popup, and fullscreen views to Checkpoint 0 and verifies there are no visual or behavioral differences.

**Acceptance:** Default parity is approved.

---

## Checkpoint 2: Add Semantic Tokens and Explicit Shadow Style Ordering

**Purpose:** Create a reliable SCSS/CSS-variable foundation while retaining current values.

**Files:**

- Create: `src/themes/tokens.scss`
- Create: `src/themes/ThemeStyles.tsx`
- Create: `src/themes/default/default-theme.scss`
- Modify: `src/addStyles.tsx`
- Modify: `src/css/root.scss`
- Modify: `src/css/colors.scss`
- Modify: `src/css/colors.module.scss`
- Modify only where values are themed:
  - `src/components/shared/Layout/appLayout.scss`
  - `src/widgets/copilot/components/Messages/messages.scss`
  - `src/widgets/copilot/components/Messages/incoming.scss`
  - `src/widgets/copilot/components/Messages/outgoing.scss`
  - `src/widgets/copilot/components/ChatInput/chatInput.scss`
  - `src/components/shared/Buttons/buttons.scss`
- Create: `tests/themes/theme-styles.test.ts`
- Create: `tests/themes/style-isolation.test.tsx`

**Token groups:**

- Text, muted text, links, danger, and focus.
- Widget, header, message, composer, input, hover, and overlay surfaces.
- Borders, radii, shadows, and transitions.
- Typography, content widths, and message widths.
- Header, message, bubble, and composer spacing.
- Overlay and portal z-index values.

**Style order:**

1. Widget reset and shared utilities.
2. Existing component styles.
3. Active theme styles.
4. Per-instance branding variables.

**Steps:**

- [ ] Define default variables using the exact current values.
- [ ] Replace only theme-relevant hardcoded values; do not rewrite all utilities.
- [ ] Map `branding.colors.primary/secondary` into documented semantic variables.
- [ ] Render active theme CSS deterministically in each Shadow DOM.
- [ ] Scope every new selector under `.gooey-chat-theme`.
- [ ] Avoid `:root`, unscoped element rules, and new `!important`.

**Automated verification:**

- [ ] Required variables all have default values.
- [ ] Theme selectors cannot escape their root.
- [ ] Branding variables affect one mount without leaking to another.
- [ ] Dialog and popper descendants inherit variables.
- [ ] Run focused tests, full tests, lint, and build.

**Manual checkpoint 2:**

The user verifies default parity, branding accents, dialogs, upload menus, media, sources, and isolation between two differently branded widgets.

**Acceptance:** Default parity and per-instance token isolation are approved.

---

## Checkpoint 3: Extract Layout, Header, Empty-State, and Icon Slots

**Purpose:** Establish structural theming around the shell before touching message and input behavior.

**Files:**

- Create: `src/themes/contracts/layout.ts`
- Create: `src/themes/contracts/header.ts`
- Create: `src/themes/contracts/empty-state.ts`
- Create: `src/themes/contracts/icons.ts`
- Create: `src/themes/default/DefaultLayout.tsx`
- Create: `src/themes/default/DefaultHeader.tsx`
- Create: `src/themes/default/DefaultEmptyState.tsx`
- Create: `src/themes/default/default-icons.tsx`
- Modify: `src/themes/types.ts`
- Modify: `src/themes/default/index.ts`
- Modify: `src/components/shared/Layout/AppLayout.tsx`
- Modify: `src/widgets/copilot/components/Header/index.tsx`
- Modify: `src/widgets/copilot/components/Messages/PlaceholderMessage.tsx`
- Modify: `src/widgets/copilot/components/ChatInput/index.tsx`
- Create: `tests/themes/layout-slots.test.tsx`
- Create: `tests/themes/header-slots.test.tsx`

**Boundaries:**

- `AppLayout` retains popup, inline, fullscreen, focus, sidebar, and drawer state.
- The theme layout receives already-created named regions and may arrange or omit optional regions.
- The existing Header becomes an adapter that builds a view model and callbacks.
- Empty-state ownership moves from `ChatInput` to the message surface.
- Icons are selected by semantic action such as send, attach, microphone, close, and new conversation.

**Automated verification:**

- [ ] Default slots produce the current structure.
- [ ] A test theme can replace the header and empty state.
- [ ] An omitted optional region is not mounted and leaves no focusable controls.
- [ ] Layout mode and sidebar callbacks remain owned outside themes.
- [ ] Run focused tests, full tests, lint, and build.

**Manual checkpoint 3:**

The user checks all layout modes, header controls, conversation sidebar, empty state, conversation starters, focus order, and close/reopen behavior.

**Acceptance:** Shell extraction has no default regression.

---

## Checkpoint 4: Extract the User-Message Presentation Slot

**Purpose:** Separate user-message behavior from bubble markup in one small step.

**Files:**

- Create: `src/themes/contracts/user-message.ts`
- Create: `src/themes/default/DefaultUserMessage.tsx`
- Modify: `src/themes/types.ts`
- Modify: `src/themes/default/index.ts`
- Modify: `src/widgets/copilot/components/Messages/OutgoingMsg.tsx`
- Modify: `src/widgets/copilot/components/Messages/outgoing.scss`
- Create: `tests/themes/user-message-slot.test.tsx`
- Create: `tests/integration/outgoing-message.test.tsx`

**Behavior retained by `OutgoingMsg`:**

- Wire-message interpretation.
- Context access.
- Copy and edit actions.
- Busy state.
- Attachment URL handling.
- Location and document actions.

**Presentation receives:**

- Normalized display data.
- Explicit action callbacks.
- Action availability and busy state.
- No contexts, controller, API URLs, or wire dictionaries.

**Automated verification:**

- [ ] Text, long text, timestamps, media, documents, audio, and location render.
- [ ] Copy/edit callbacks and payloads match the baseline.
- [ ] Attachment-only messages remain valid.
- [ ] A test theme can replace bubble markup without accessing context.
- [ ] Run focused tests, full tests, lint, and build.

**Manual checkpoint 4:**

The user verifies normal, long, attachment-only, image, document, audio, and location user messages plus copy and edit.

**Acceptance:** User-message behavior and default visuals are approved.

---

## Checkpoint 5: Extract the Assistant-Message Presentation Slot

**Purpose:** Separate assistant rendering from feedback, reply, source, media, and rerun behavior.

**Files:**

- Create: `src/themes/contracts/assistant-message.ts`
- Create: `src/themes/default/DefaultAssistantMessage.tsx`
- Modify: `src/themes/types.ts`
- Modify: `src/themes/default/index.ts`
- Modify: `src/widgets/copilot/components/Messages/IncomingMsg.tsx`
- Modify: `src/widgets/copilot/components/Messages/incoming.scss`
- Modify as needed: `src/components/shared/Response/index.tsx`
- Create: `tests/themes/assistant-message-slot.test.tsx`
- Create: `tests/integration/incoming-message.test.tsx`

**Behavior retained by `IncomingMsg`:**

- Stream event interpretation.
- Context and controller callbacks.
- Reply and feedback payload construction.
- Location modal orchestration.
- Source preview/navigation.
- Copy and rerun behavior.
- Latest-message autoplay decisions.

**Automated verification:**

- [ ] Starting, running, completed, and failed states render.
- [ ] Markdown, code, LaTeX, media, tools, sources, buttons, feedback, location, run link, and rerun remain functional.
- [ ] Existing payloads are unchanged.
- [ ] Unsafe content remains sanitized.
- [ ] A test theme can replace bubble chrome without accessing wire data.
- [ ] Run focused tests, full tests, lint, and build.

**Manual checkpoint 5:**

The user checks streaming, rich text, code, media, sources, tools, replies, feedback, location, copy, rerun, loading, and error states.

**Acceptance:** Assistant behavior and default visuals are approved.

---

## Checkpoint 6: Extract the Composer Presentation Slot

**Purpose:** Make the input replaceable while retaining all draft, upload, audio, and submission behavior.

**Files:**

- Create: `src/themes/contracts/composer.ts`
- Create: `src/themes/default/DefaultComposer.tsx`
- Modify: `src/themes/types.ts`
- Modify: `src/themes/default/index.ts`
- Modify: `src/widgets/copilot/components/ChatInput/index.tsx`
- Modify: `src/widgets/copilot/components/ChatInput/GooeyTextArea.tsx`
- Modify: `src/widgets/copilot/components/ChatInput/FilePreview.tsx`
- Modify: `src/widgets/copilot/components/ChatInput/chatInput.scss`
- Create: `tests/themes/composer-slot.test.tsx`
- Create: `tests/integration/chat-input.test.tsx`

**Behavior retained by `ChatInput`:**

- Draft state.
- File creation, upload, retry, removal, and payload routing.
- Pre-attached input handling.
- Audio recording orchestration.
- Send/stop decisions.
- Context submission.
- Shadow-aware menu dismissal.

**Automated verification:**

- [ ] Text, Enter, Shift+Enter, IME, send, and stop work.
- [ ] Upload success, failure, retry, removal, and in-flight blocking work.
- [ ] Image, video, audio, and document payload routing is unchanged.
- [ ] Audio recording callbacks remain unchanged.
- [ ] A test theme can replace composer markup using only the presentation contract.
- [ ] Run focused tests, full tests, lint, and build.

**Manual checkpoint 6:**

The user tests typing, keyboard behavior, all attachment types, failed upload retry, removal, audio recording, send, stop, disabled states, and menu dismissal.

**Acceptance:** Composer behavior and default visuals are approved.

---

## Checkpoint 7: Implement the WhatsApp Theme

**Purpose:** Add the first alternate theme using only the established contracts.

**Files:**

- Create: `src/themes/whatsapp/index.ts`
- Create: `src/themes/whatsapp/whatsapp-theme.scss`
- Create: `src/themes/whatsapp/WhatsAppLayout.tsx`
- Create: `src/themes/whatsapp/WhatsAppHeader.tsx`
- Create: `src/themes/whatsapp/WhatsAppEmptyState.tsx`
- Create: `src/themes/whatsapp/WhatsAppUserMessage.tsx`
- Create: `src/themes/whatsapp/WhatsAppAssistantMessage.tsx`
- Create: `src/themes/whatsapp/WhatsAppComposer.tsx`
- Create: `src/themes/whatsapp/whatsapp-icons.tsx`
- Modify: `src/themes/registry.ts`
- Modify: `src/main.js`
- Create: `tests/themes/whatsapp-theme.test.tsx`

**Scope:**

- WhatsApp-style header, background, bubbles, timestamps, composer, empty state, and icons.
- Approved repository-owned assets only.
- No theme-specific controller, API, upload, streaming, scrolling, or wire-format logic.
- Reuse default slots for any region that does not need distinct markup.

**Automated verification:**

- [ ] Registry resolves WhatsApp.
- [ ] Every message phase and content type renders.
- [ ] All callbacks and payloads match default behavior.
- [ ] Optional regions are omitted accessibly.
- [ ] Mobile, desktop, Bootstrap-host, and reduced-motion checks pass.
- [ ] Measure CSS and IIFE growth.
- [ ] Run full tests, lint, and build.

**Manual checkpoint 7:**

The user reviews the WhatsApp theme at mobile and desktop widths:

- Shell and background.
- Header and controls.
- User and assistant bubbles.
- Timestamps and action placement.
- Empty state and starters.
- Composer and all input states.
- Loading, errors, media, sources, tools, replies, feedback, and location.
- Keyboard focus and contrast.

Repeat this checkpoint until the visual treatment is approved.

**Acceptance:** The user explicitly approves the WhatsApp theme.

---

## Checkpoint 8: Harden Controller Updates, Portals, and Multi-Mount Isolation

**Purpose:** Verify the new presentation system under the actual server-style controller lifecycle.

**Files:**

- Modify as required: `src/contexts/ControllerUtils.ts`
- Modify as required: `src/contexts/SystemContext.tsx`
- Modify as required: `src/contexts/MessagesContext.tsx`
- Modify: `src/components/shared/Response/MediaPreview.tsx`
- Modify: `src/components/shared/Dialog.tsx`
- Modify: `src/components/shared/Popper/Popper.tsx`
- Create: `tests/integration/controller-theme.test.tsx`
- Create: `tests/integration/theme-portals.test.tsx`
- Create: `tests/integration/multi-mount.test.tsx`

**Automated verification:**

- [ ] Host messages update through `controller.setMessages`.
- [ ] Controller send, new-conversation, edit, rerun, and conversation callbacks remain delegated.
- [ ] Controller mode does not start widget-owned streaming.
- [ ] `updateConfig` changes theme and branding without losing messages or remounting.
- [ ] Dialogs, poppers, and media viewers use the correct Shadow DOM.
- [ ] Default and WhatsApp widgets can coexist and open overlays independently.
- [ ] Run full tests, lint, and build.

**Manual checkpoint 8:**

The user uses the local controller harness to verify live messages, preserved draft, runtime theme changes, overlays, and two simultaneous differently themed widgets.

**Acceptance:** Controller behavior and Shadow DOM isolation are approved.

---

## Checkpoint 9: Enable WhatsApp Only in Gooey Server VideoBots

**Purpose:** Select the theme through existing widget config without replacing the controller architecture.

**Widget prerequisite:** Build and locally serve the widget bundle. Set Gooey Server's `WEB_WIDGET_LIB` to the local bundle. Do not publish it.

**Gooey Server files:**

- Modify: `/Users/mishi/code/core-app/gooey-server/recipes/VideoBots.py`
- Modify: `/Users/mishi/code/core-app/gooey-server/daras_ai_v2/settings.py`
- Add focused test if practical: `/Users/mishi/code/core-app/gooey-server/tests/test_videobots_widget_theme.py`
- Do not modify for theming: `/Users/mishi/code/core-app/gooey-server/gooey-gui/app/components/GooeyBuilderInlineEmbed.tsx`

**Server behavior:**

- Add a narrowly named default-off setting for the VideoBots WhatsApp preview.
- When enabled, include `theme: "whatsapp"` in the existing VideoBots config.
- Include the theme in the existing `controller.updateConfig` refresh alongside branding.
- Keep `GooeyEmbed.mount(config, controller)`, hidden form controls, message conversion, session rerenders, conversation fetching, and `copilotPreviewControl`.
- Leave Builder, public integrations, hosted chat pages, and embedded widgets on default.

**Automated verification:**

- [ ] Flag-off config omits WhatsApp.
- [ ] Flag-on config selects WhatsApp.
- [ ] Relevant Python tests pass.
- [ ] Gooey GUI typecheck passes.
- [ ] Server starts in both flag states.

**Manual checkpoint 9:**

The user verifies:

- VideoBots flag off remains default.
- VideoBots flag on uses WhatsApp.
- History, new conversation, sending, attachments, audio, location, running updates, sidebar navigation, and branding refresh work.
- Builder and public widget previews remain default.
- Refresh/navigation does not duplicate the widget.

**Acceptance:** Both flag states and unaffected server surfaces are approved.

---

## Checkpoint 10: Documentation and Final Verification

**Files:**

- Modify: `README.md`
- Create: `docs/theming.md`

**Documentation:**

- Public theme config and fallback.
- Registry and slot responsibilities.
- Semantic token reference.
- SCSS and Shadow DOM rules.
- How to add color-only and structural themes.
- Region omission and accessibility.
- Portal ownership.
- Gooey Server local test and rollout procedure.
- Default compatibility expectations.

**Final automated verification:**

- [ ] Run the complete test suite.
- [ ] Run lint and production build.
- [ ] Verify default and WhatsApp in all supported modes and widths.
- [ ] Verify controller and standalone behavior.
- [ ] Verify multiple simultaneous themes.
- [ ] Verify bundle-size results are recorded.
- [ ] Verify no publish, deploy, tag, or CDN mutation occurred.

**Manual checkpoint 10:**

Give the user final local links for default inline, popup, fullscreen, WhatsApp inline, dual-theme isolation, VideoBots flag off/on, Builder, and public integration preview.

**Acceptance:** The user approves the full matrix and the work is ready for a separately requested commit/PR/release process.

---

## Proposed Review Boundaries

These are review boundaries, not authorization to commit:

1. Baseline and test harness.
2. Theme identity.
3. Tokens and style injection.
4. Shell slots.
5. User-message slot.
6. Assistant-message slot.
7. Composer slot.
8. WhatsApp theme.
9. Controller and portal hardening.
10. Gooey Server selection.
11. Documentation and final verification.

## Out of Scope

- Direct React consumption by Gooey Server.
- Replacing the controller architecture.
- Rewriting all existing SCSS utilities.
- Publishing a component package.
- Slack, Teams, or third-party theme plugins.
- Backend message or API payload changes.
- Publishing or deploying the widget.
