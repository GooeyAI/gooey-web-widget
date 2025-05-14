// import GooeyEmbed from "src/lib.tsx";
import GooeyChatWidget from "src/components/ChatWidget";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { useState, useCallback } from "react";
import GooeyEmbed from "./lib";

GooeyEmbed.mount({ target: "#popup", integration_id: "4rv", mode: "popup" });
GooeyEmbed.mount({ target: "#inline", integration_id: "4rv", mode: "inline" });


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Type for a message (from widget's types)
type Message = {
  id?: string;
  bot_message_id?: string;
  role?: string;
  input_prompt?: string;
  input_images?: any[];
  input_audio?: string;
  type?: string;
  status?: string;
  output_text?: string[];
  output_audio?: any[];
  output_video?: any[];
  references?: { url: string; title: string }[];
  buttons?: { id: string; title: string; isPressed: boolean }[];
  [key: string]: any;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    input_prompt: "What's the weather like today?",
    input_images: [],
    input_audio: "",
  },
  {
    bot_message_id: "2",
    role: "assistant",
    type: "final_response",
    status: "completed",
    output_text: ["It's sunny and 25°C."],
    output_audio: [],
    output_video: [],
    references: [
      {
        url: "https://youtube.com/",
        title: "Weather Report",
      },
    ],
    buttons: [
      {
        id: "thumbs_up",
        title: "Helpful",
        isPressed: false,
      },
      {
        id: "thumbs_down",
        title: "Not Helpful",
        isPressed: false,
      },
    ],
  },
];

const dummyConfig = {
  showSources: true,
  autoPlayResponses: true,
  branding: {
    colors: {
      primary: "#007bff",
    },
    photoUrl: "https://gooey.ai/favicon.ico",
  },
};

function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);

  // Called when user sends a message
  const handleSend = useCallback((msg: any) => {
    setIsSending(true);
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        role: "user",
        ...msg,
      },
    ]);
    // Simulate bot response after 1s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          bot_message_id: (prev.length + 1).toString(),
          role: "assistant",
          type: "final_response",
          status: "completed",
          output_text: ["This is a simulated bot response."],
          output_audio: [],
          output_video: [],
          references: [],
          buttons: [
            { id: "thumbs_up", title: "Helpful", isPressed: false },
            { id: "thumbs_down", title: "Not Helpful", isPressed: false },
          ],
        },
      ]);
      setIsSending(false);
    }, 1000);
  }, []);

  // Called when user cancels sending
  const handleCancelSend = useCallback(() => {
    setIsSending(false);
  }, []);

  // Called when user starts a new conversation
  const handleNewConversation = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 400, height: 600, border: "1px solid #eee", borderRadius: 8 }}>
        <GooeyChatWidget
          messages={messages}
          isSending={isSending}
          config={dummyConfig}
          onSend={handleSend}
          onCancelSend={handleCancelSend}
          onNewConversation={handleNewConversation}
        />
      </div>
    </div>
  );
}