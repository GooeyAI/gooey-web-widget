import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useMessageStore = () => {
  const [messages, setMessages] = useState(new Map());
  const [latestMessageIds, setLatestMessageIds] = useState(new Set<string>());
  const [preAttachedFileUsed, setPreAttachedFileUsed] = useState(false);

  const addResponse = useCallback((response: any) => {
    setMessages((prev: any) => {
      const newMessages = new Map(prev.set(response.id, response));
      return newMessages;
    });
  }, []);

  const preLoadData = useCallback((data: any) => {
    const newMap = new Map();
    data.forEach((obj: any) => {
      if (!obj.id) obj.id = uuidv4();
      newMap.set(obj.id, { ...obj });
    });
    setMessages(newMap);
    // Clear newly received message IDs when loading existing conversations
    setLatestMessageIds(new Set());
  }, []);

  const purgeMessages = useCallback(() => {
    setMessages(new Map());
    setLatestMessageIds(new Set());
  }, []);

  return {
    messages,
    setMessages,
    latestMessageIds,
    setLatestMessageIds,
    preAttachedFileUsed,
    setPreAttachedFileUsed,
    addResponse,
    preLoadData,
    purgeMessages,
  };
};
