import { useSystemContext } from "src/contexts/hooks";
import CopilotWidget from "./components/widget";
import WithFabLauncher from "src/components/containers/withFabLauncher";

export default function ChatWidget() {
  const { config, open } = useSystemContext();
  switch (config?.mode) {
    case "popup":
      return (
        <WithFabLauncher open={open || false}>
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
