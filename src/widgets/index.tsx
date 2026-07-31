import React from "react";
import ReactDOM from "react-dom/client";
import { addInlineStyle, Styles } from "src/addStyles";
import { CopilotChatWidgetController } from "src/contexts/ControllerUtils";
import MessagesContextProvider from "src/contexts/MessagesContext";
import SystemContextProvider from "src/contexts/SystemContext";
import rootStyle from "src/css/root.scss?inline";
import { resolveTheme } from "src/themes";
import whatsappStyle from "src/themes/whatsapp.scss?inline";
import ChatWidget from "./copilot";
import { ShadowRootContext } from "src/contexts/ShadowRootContext";
import * as Sentry from "@sentry/react";
addInlineStyle(rootStyle);
addInlineStyle(whatsappStyle);

export function renderCopilotChatWidget(
  elem: Element,
  config?: any,
  controller?: CopilotChatWidgetController,
) {
  const shadowRoot = elem.attachShadow({ mode: "open", delegatesFocus: true });
  const root = ReactDOM.createRoot(shadowRoot);
  root.render(
    <React.StrictMode>
      <CopilotChatWidget
        config={config}
        controller={controller}
        shadowRoot={shadowRoot}
      />
    </React.StrictMode>,
  );
  return root;
}

export function CopilotChatWidget({
  config,
  controller,
  shadowRoot,
}: {
  config?: any;
  controller?: CopilotChatWidgetController;
  shadowRoot?: ShadowRoot;
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
  config.theme = resolveTheme(config.theme);

  return (
    <div
      className="gooey-embed-container gooey-chat-theme text-almostBlack"
      data-gooey-theme={config.theme}
      tabIndex={-1}
    >
      <Styles />
      <Sentry.ErrorBoundary>
        <SystemContextProvider
          config={config}
          shadowRoot={shadowRoot}
          controller={controller}
        >
          <MessagesContextProvider
            controller={controller}
            shadowRoot={shadowRoot}
          >
            <ShadowRootContext.Provider value={shadowRoot}>
              <ChatWidget />
            </ShadowRootContext.Provider>
          </MessagesContextProvider>
        </SystemContextProvider>
      </Sentry.ErrorBoundary>
    </div>
  );
}
