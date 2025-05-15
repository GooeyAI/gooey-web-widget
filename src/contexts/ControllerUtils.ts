import { useState } from "react";
import { uploadPayloadFiles } from "src/api/file-upload";
import type {
  MessageMishmash,
  MessagesContextType,
  RequestModel,
} from "./MessagesContext";

export type CopilotChatWidgetController = {
  messages: MessageMishmash[];
  onSendMessage: (payload: RequestModel) => void;
  onNewConversation: () => void;
  setMessages?: (messages: MessageMishmash[]) => void;
};

export function useController({
  controller,
  apiUrl,
  isSending,
  isReceiving,
  scrollToMessage,
}: {
  controller?: CopilotChatWidgetController;
  apiUrl: string;
  isSending: boolean;
  isReceiving: boolean;
  scrollToMessage: () => void;
}): MessagesContextType {
  let [messages, setMessages] = useState<Map<string, MessageMishmash>>(
    msgArrayToMap(controller?.messages || []),
  );
  if (!controller) return {};
  controller.setMessages = (entries: MessageMishmash[]) => {
    let newMessages = msgArrayToMap(entries);
    if (!isMapEqual(messages, newMessages)) {
      setMessages(newMessages);
      scrollToMessage();
    }
  };
  return {
    messages,
    async initializeQuery(payload: RequestModel) {
      if (!payload || isSending || isReceiving) return;
      await uploadPayloadFiles(payload, apiUrl);
      controller?.onSendMessage(payload);
    },
    handleNewConversation: controller?.onNewConversation,
  };
}

function msgArrayToMap(
  entries: MessageMishmash[],
): Map<string, MessageMishmash> {
  let ret = new Map<string, MessageMishmash>();
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    entry.id = `simple-msg-id-${i}`;
    ret.set(entry.id, entry);
  }
  return ret;
}

function isMapEqual(
  map1: Map<string, MessageMishmash>,
  map2: Map<string, MessageMishmash>,
) {
  if (map1.size !== map2.size) return false;
  return JSON.stringify([...map1]) === JSON.stringify([...map2]);
}
