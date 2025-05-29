import React from "react";
import ReactDOM from "react-dom/client";
import { addInlineStyle, Styles } from "src/addStyles";
import { CopilotChatWidgetController } from "src/contexts/ControllerUtils";
import MessagesContextProvider from "src/contexts/MessagesContext";
import SystemContextProvider from "src/contexts/SystemContext";
import rootStyle from "src/css/root.scss?inline";
import ChatWidget from "./copilot";
addInlineStyle(rootStyle);

export function renderCopilotChatWidget(
  elem: Element,
  config?: any,
  controller?: CopilotChatWidgetController,
) {
  const shadow = elem.attachShadow({ mode: "open", delegatesFocus: true });
  const root = ReactDOM.createRoot(shadow);
  root.render(
    <React.StrictMode>
      <CopilotChatWidget config={config} controller={controller} />
    </React.StrictMode>,
  );
  return root;
}

export function CopilotChatWidget({
  config,
  controller,
}: {
  config?: any;
  controller?: CopilotChatWidgetController;
}) {
  // apply defaults to the user-provided config
  config = {
    mode: "inline",
    enableAudioMessage: true,
    showSources: true,
    ...config,
    branding: {
      showPoweredByGooey: true,
      ...config?.branding,
    },
  };
  config.apiUrl ||= "https://api.gooey.ai";
  config.branding.name ||= "Gooey";
  config.branding.title ||= config.branding.name;
  config.branding.photoUrl ||= "https://gooey.ai/favicon.ico";

  return (
    <div className="gooey-embed-container" tabIndex={-1}>
      <Styles />
      <SystemContextProvider config={config}>
        <MessagesContextProvider controller={controller}>
          <ChatWidget />
        </MessagesContextProvider>
      </SystemContextProvider>
    </div>
  );
}
