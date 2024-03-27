import { useContext } from "react";
import { MessagesContext } from "./MessagesContext";
import { SystemContext, SystemContextType } from "./SystemContext";

export const useMessagesContext = () => useContext(MessagesContext);
export const useSystemContext = (): SystemContextType => useContext(SystemContext);
