import { useSystemContext } from "src/contexts/hooks";
import CopilotWidget from "./components/widget";
import WithFabLauncher from "src/components/containers/withFabLauncher";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

export default function ChatWidget() {
  const { config, layoutController } = useSystemContext();
  switch (config?.mode) {
    case "popup":
      return (
        <WithFabLauncher open={layoutController?.isOpen || false}>
          <CopilotWidget />
        </WithFabLauncher>
      );
    case "inline":
      return <CopilotWidget isInline />;
    case "fullscreen":
      return (
        <div className="gooey-fullscreen">
          <CopilotWidget isInline />
        </div>
      );
    default:
      return null;
  }
}
