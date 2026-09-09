// Cross-component constants live here rather than on a component barrel, so a
// module needing an id doesn't have to import the component tree that owns it
// (MessagesContext -> ChatInput -> Messages -> MessagesContext).

export const CHAT_INPUT_ID = "gooeyChat-input";

export const MESSAGE_GUTTER = 8;

// One size for every glyph in a message's action row, on the response and on
// the prompt alike. The button box follows from it — 8px of padding and a 1px
// border on each side, from the base `button` rule — so the row is only square
// and even while the icons agree.
export const ACTION_ICON_SIZE = 14;
