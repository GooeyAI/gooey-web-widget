import React from "react";
import ReactDOM from "react-dom/client";
import { addInlineStyle, Styles } from "src/addStyles";
import { CopilotChatWidgetController } from "src/contexts/ControllerUtils";
import MessagesContextProvider from "src/contexts/MessagesContext";
import SystemContextProvider from "src/contexts/SystemContext";
import rootStyle from "src/css/root.scss?inline";
import ChatWidget from "./copilot";
import { ShadowRootContext } from "src/contexts/ShadowRootContext";
import * as Sentry from "@sentry/react";
addInlineStyle(rootStyle);

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

  return (
    <div className="gooey-embed-container" tabIndex={-1}>
      <Styles />
      <Sentry.ErrorBoundary fallback={WidgetCrashFallback}>
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

// Rendered when any child of the widget throws during render. The default
// Sentry.ErrorBoundary fallback is null, which blanks the whole widget —
// we prefer a visible, recoverable surface so the user isn't left staring
// at an empty container.
const WidgetCrashFallback = ({
  resetError,
}: {
  resetError: () => void;
}) => (
  <div className="d-flex flex-col align-center justify-center gp-16 h-100 w-100 text-center">
    <p className="font_16_500 gooey-error-text gmb-8">Something went wrong</p>
    <p className="font_14_400 gmb-16">
      The chat widget hit an unexpected error. Try again, or reload the page
      if the problem persists.
    </p>
    <button
      className="gooey-error-details-toggle cr-pointer font_14_500 gp-8 b-1 br-default"
      onClick={resetError}
    >
      Try again
    </button>
  </div>
);
