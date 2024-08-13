import React from "react";
import ReactDOM from "react-dom/client";
import MessagesContextProvider from "src/contexts/MessagesContext";
import SystemContextProvider from "src/contexts/SystemContext";
import ChatWidget from "./copilot";

import { addInlineStyle, Styles } from "src/addStyles";
import rootStyle from "src/css/root.scss?inline";

addInlineStyle(rootStyle);

export function CopilotChatWidget({ config }: { config?: any }) {
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
  config.branding.name ||= "Gooey";
  config.branding.photoUrl ||= "https://gooey.ai/favicon.ico";

  return (
    <div className="gooey-embed-container" style={{ height: "100%" }}>
      <Styles />
      <SystemContextProvider config={config}>
        <MessagesContextProvider>
          <ChatWidget />
        </MessagesContextProvider>
      </SystemContextProvider>
    </div>
  );
}

export function renderCopilotChatWidget(elem: Element, config?: any) {
  const shadow = elem.attachShadow({ mode: "open", delegatesFocus: true });
  const root = ReactDOM.createRoot(shadow);
  root.render(
    <React.StrictMode>
      <CopilotChatWidget config={config} />
    </React.StrictMode>,
  );
  return root;
}
