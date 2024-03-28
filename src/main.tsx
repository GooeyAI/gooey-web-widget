import React from "react";
import ReactDOM from "react-dom/client";
import { CopilotChatWidget } from "./widgets";
import "src/css/root.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CopilotChatWidget
      config={{
        secret_key: process.env.GOOEY_API_KEY || "",
        bot_id: process.env.REACT_APP_BOT_ID || "",
        bot_profile: {
          title: "Farmer.CHAT",
          description:
            "An AI Assistant designed to help farmer extension agents in India.",
          created_by: "Digital Green",
          display_picture:
            "https://digitalgreen.org/wp-content/themes/digital-green/images/favicons/apple-touch-icon.png",
          creator_link: "https://digitalgreen.org/",
        },
        link_color: "#FFD700",
        icon_text: "Help",
        questions: [
          "When should I plant chili?",
          "How can I get rid of black ants on my coffee?",
          "What is the best time to grow pepper in India?",
        ],
        show_gooey_branding: true,
        show_sources: false,
        bot_name: "Farmer.CHAT",
      }}
    />
  </React.StrictMode>
);
