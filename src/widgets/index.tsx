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

const SUPPORT_EMAIL = "support@gooey.ai";

// Rendered when any child of the widget throws during render. Styles are
// scoped via a local <style> tag because this fallback may render before
// <Styles /> mounts the shadow-DOM stylesheet, so the project's utility
// classes (font_*, gp-*, etc.) aren't available here.
const WidgetCrashFallback = ({
  error,
  eventId,
}: {
  error?: unknown;
  eventId?: string;
  componentStack?: string;
  resetError?: () => void;
}) => {
  const errorText =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : String(error ?? "Unknown error");
  const subject = encodeURIComponent("Gooey Chat Widget — Error report");
  const body = encodeURIComponent(
    [
      "Hi Gooey support,",
      "",
      "I ran into an error while using the chat widget.",
      "",
      "What I was doing: [please describe]",
      "",
      "--- Diagnostic info ---",
      `Error: ${errorText}`,
      eventId ? `Sentry event ID: ${eventId}` : null,
      `Page: ${window.location.href}`,
      `Time: ${new Date().toISOString()}`,
      `User agent: ${navigator.userAgent}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <div className="gooey-crash">
      <style>{`
        .gooey-crash {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          width: 100%;
          padding: 16px;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        }
        .gooey-crash__bar {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 420px;
          padding: 10px 12px;
          background: #fdecec;
          border: 1px solid #f5c2c7;
          border-radius: 8px;
          color: #842029;
        }
        .gooey-crash__icon {
          flex: 0 0 auto;
          width: 18px;
          height: 18px;
          color: #dc3545;
        }
        .gooey-crash__text {
          flex: 1 1 auto;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          margin: 0;
        }
        .gooey-crash__link {
          color: #842029;
          text-decoration: underline;
          font-weight: 600;
        }
        .gooey-crash__retry {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          padding: 0;
          border: none;
          background: transparent;
          color: #842029;
          cursor: pointer;
          border-radius: 6px;
        }
        .gooey-crash__retry:hover { background: rgba(132, 32, 41, 0.1); }
        .gooey-crash__retry svg { width: 16px; height: 16px; }
      `}</style>
      <div className="gooey-crash__bar" role="alert">
        <svg
          className="gooey-crash__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="gooey-crash__text">
          Something went wrong.{" "}
          <a className="gooey-crash__link" href={mailto}>
            Contact support
          </a>
        </p>
        <button
          className="gooey-crash__retry"
          onClick={() => window.location.reload()}
          aria-label="Reload"
          title="Reload"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>
    </div>
  );
};
