import { useSystemContext } from "src/contexts/hooks";
import CopilotWidget from "./components/widget";
import WithFabLauncher from "src/components/containers/withFabLauncher";
import { SystemContextType } from "src/contexts/SystemContext";

function ChatWidget() {
  const { config, open }: SystemContextType = useSystemContext();

  // TYPE = DIRECT - INSERT DIRECTLY INSIDE DIV
  if (config?.type === "copilot-direct") return <CopilotWidget isDirect />;

  // TYPE = FAB - INSERT INTO FAB LAUNCHER
  if (config?.type === "copilot-fab")
    return (
      <WithFabLauncher open={open || false}>
        <CopilotWidget />
      </WithFabLauncher>
    );

  // Support more type here
  return null;
}

export default ChatWidget;
