import React from "react";
import ReactDOM from "react-dom/client";
import { CopilotChatWidget } from "./widgets";
import "src/css/root.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CopilotChatWidget />
  </React.StrictMode>
);
