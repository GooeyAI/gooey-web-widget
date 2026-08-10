// Cross-component constants live here rather than on a component barrel, so a
// module needing an id doesn't have to import the component tree that owns it
// (MessagesContext -> ChatInput -> Messages -> MessagesContext).

export const CHAT_INPUT_ID = "gooeyChat-input";

export const MESSAGE_GUTTER = 8;
