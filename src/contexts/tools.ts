declare global {
  interface Window {
    gui: any;
  }
}

export function handleToolCall(entry: any, lastMessageId?: string) {
  if (!entry) return;

  let update_gui_state = {};
  let tool_calls = entry.tool_calls || [];
  for (let toolCall of tool_calls) {
    if (!toolCall.function.arguments) continue;
    switch (toolCall.function.name) {
      case "update_gui_state":
        let state = JSON.parse(toolCall.function.arguments);
        // sometimes the state is nested in a `state` key
        state = state["state"] || state;
        // collate all the state updates in a single object
        update_gui_state = {
          ...update_gui_state,
          ...state,
          last_message_id: lastMessageId,
        };
        break;
      case "run_js": {
        const { js_code } = JSON.parse(toolCall.function.arguments);
        eval(js_code);
        break;
      }
    }
  }

  if (Object.keys(update_gui_state).length) {
    window.gui?.update_session_state?.({
      update_gui_state,
    });
  }
}
