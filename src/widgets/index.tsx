import MessagesContextProvider from "src/contexts/MessagesContext";
import SystemContextProvider from "src/contexts/SystemContext";
import ChatWidget from "./copilot";
import "@fontsource/nunito";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";

// Default values fed to the widget to develop without injecting
const CopilotChatWidget = ({
  secret_key = process.env.GOOEY_API_KEY,
  bot_id = process.env.REACT_APP_BOT_ID,
  bot_profile = {
    title: "Farmer.CHAT",
    description:
      "An AI Assistant designed to help farmer extension agents in India.",
    created_by: "Digital Green",
    display_picture:
      "https://digitalgreen.org/wp-content/themes/digital-green/images/favicons/apple-touch-icon.png",
  },
}) => {
  return (
    <MessagesContextProvider secretKey={secret_key} botId={bot_id}>
      <SystemContextProvider bot_profile={bot_profile}>
        <ChatWidget />
      </SystemContextProvider>
    </MessagesContextProvider>
  );
};

export { CopilotChatWidget };
