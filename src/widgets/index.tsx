import React from "react";
import ReactDOM from "react-dom/client";
import { addInlineStyle, Styles } from "src/addStyles";
import { CopilotChatWidgetController } from "src/contexts/ControllerUtils";
import MessagesContextProvider from "src/contexts/MessagesContext";
import SystemContextProvider from "src/contexts/SystemContext";
import rootStyle from "src/css/root.scss?inline";
import { resolveTheme } from "src/themes";
import builderStyle from "src/themes/builder.scss?inline";
import whatsappStyle from "src/themes/whatsapp.scss?inline";
import ChatWidget from "./copilot";
import { ShadowRootContext } from "src/contexts/ShadowRootContext";
import { useSystemContext } from "src/contexts/hooks";
import * as Sentry from "@sentry/react";
addInlineStyle(rootStyle, "utility");
addInlineStyle(builderStyle, "theme");
addInlineStyle(whatsappStyle, "theme");

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
    <SystemContextProvider
      config={config}
      shadowRoot={shadowRoot}
      controller={controller}
    >
      <MessagesContextProvider controller={controller} shadowRoot={shadowRoot}>
        <ShadowRootContext.Provider value={shadowRoot}>
          <ThemedRoot shadowRoot={shadowRoot}>
            <ChatWidget />
          </ThemedRoot>
        </ShadowRootContext.Provider>
      </MessagesContextProvider>
    </SystemContextProvider>
  );
}

/**
 * The embed root that carries the theme hooks (`data-gooey-theme` and the
 * `--gooey-brand-primary` custom property) read by the theme stylesheets.
 *
 * It lives *inside* `SystemContextProvider` and reads the config from context
 * rather than from the mount-time prop, so `controller.updateConfig` — which
 * updates that context state in place — reskins the widget on the fly. Keeping
 * it above the provider (as it was) meant the attribute was fixed at mount and
 * a theme change required a full unmount/remount of the React root.
 *
 * The error boundary sits inside this div rather than around it, so a crash in
 * the widget cannot unmount the container: it is the portal target for Popper
 * and Dialog, it carries the base styles any fallback UI needs, and in the
 * `<style>` fallback path it holds the stylesheet itself.
 */
function ThemedRoot({
  shadowRoot,
  children,
}: {
  shadowRoot?: ShadowRoot;
  children: React.ReactNode;
}) {
  const { config } = useSystemContext();
  const theme = resolveTheme(config?.theme);
  const brandPrimary: string | undefined = config?.branding?.colors?.primary;

  return (
    <div
      className="gooey-embed-container gooey-chat-theme text-almostBlack"
      data-gooey-theme={theme}
      style={
        brandPrimary
          ? ({ "--gooey-brand-primary": brandPrimary } as React.CSSProperties)
          : undefined
      }
      tabIndex={-1}
    >
      <Styles shadowRoot={shadowRoot} />
      <Sentry.ErrorBoundary>{children}</Sentry.ErrorBoundary>
    </div>
  );
}
