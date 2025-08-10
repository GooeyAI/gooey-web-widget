declare global {
  interface Window {
    gui: any;
  }
}

export function handleToolCalls({ final_prompt }: { final_prompt?: any[] }) {
  if (!final_prompt) return;

  let update_gui_state = {};

  for (let entry of final_prompt) {
    if (!entry.tool_calls) continue;
    for (let toolCall of entry.tool_calls) {
      switch (toolCall.function.name) {
        case "update_gui_state":
          let state = JSON.parse(toolCall.function.arguments);
          // sometimes the state is nested in a `state` key
          state = state["state"] || state;
          // collate all the state updates in a single object
          update_gui_state = { ...update_gui_state, ...state };
          break;
        case "run_js": {
          const { js_code } = JSON.parse(toolCall.function.arguments);
          eval(js_code);
          break;
        }
      }
    }
  }

  if (Object.keys(update_gui_state).length) {
    window.gui?.update_session_state?.({ update_gui_state });
  }
}
