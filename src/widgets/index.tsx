import MessagesContextProvider from "src/contexts/MessagesContext";
import SystemContextProvider from "src/contexts/SystemContext";
import ChatWidget from "./copilot";
import "@fontsource/nunito";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import { CopilotConfigType } from "src/contexts/types";

// Default values fed to the widget to develop without injecting

const CopilotChatWidget = ({ config }: { config: CopilotConfigType }) => {
  return (
    <SystemContextProvider config={config}>
      <MessagesContextProvider>
        <ChatWidget />
      </MessagesContextProvider>
    </SystemContextProvider>
  );
};

export { CopilotChatWidget };
