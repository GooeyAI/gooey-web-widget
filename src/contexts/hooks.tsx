import { useContext } from "react";
import { MessagesContext } from "./MessagesContext";
import { SystemContext } from "./SystemContext";

export const useMessagesContext = () => useContext(MessagesContext);
export const useSystemContext = () => useContext(SystemContext);
