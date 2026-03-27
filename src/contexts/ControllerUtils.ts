import { useState } from "react";
import { uploadPayloadFiles } from "src/api/file-upload";
import type {
  MessageMishmash,
  MessagesContextType,
  RequestModel,
} from "./MessagesContext";
import type { CopilotConfigType } from "./types";
import { Conversation } from "./ConversationLayer";

export type CopilotChatWidgetController = {
  messages?: MessageMishmash[];
  onSendMessage?: (payload: RequestModel) => void;
  onNewConversation?: () => void;
  setMessages?: (messages: MessageMishmash[]) => void;
  updateConfig?: (config: CopilotConfigType) => void;
  setConversationData?: (conversation: Conversation) => void;
  onConversationChange?: (conversationId: string) => void;
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

  let ctx: MessagesContextType = {};
  if (!controller) return ctx;

  if (controller.messages) {
    ctx.messages = messages;
    controller.setMessages = (entries: MessageMishmash[]) => {
      let newMessages = msgArrayToMap(entries);
      if (!isMapEqual(messages, newMessages)) {
        setMessages(newMessages);
        scrollToMessage();
      }
    };
  }

  if (controller.onSendMessage) {
    ctx.initializeQuery = async (payload: RequestModel) => {
      if (!payload || isSending || isReceiving) return;
      await uploadPayloadFiles(payload, apiUrl);
      controller.onSendMessage?.(payload);
    };
  }

  if (controller.onNewConversation) {
    ctx.handleNewConversation = controller.onNewConversation;
  }

  return ctx;
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

function isMapEqual(map1: Map<string, any>, map2: Map<string, any>) {
  if (map1.size !== map2.size) return false;
  return JSON.stringify([...map1]) === JSON.stringify([...map2]);
}
