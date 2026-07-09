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
  editQuery?: (messageId: string, payload: RequestModel) => void;
  onNewConversation?: () => void;
  setMessages?: (messages: MessageMishmash[]) => void;
  updateConfig?: (config: CopilotConfigType) => void;
  setConversationData?: (conversation: Conversation) => void;
  onConversationChange?: (conversationId: string) => void;
  fetchConversations?: () => Promise<Conversation[]>;
  rerun?: (run_url: string) => void;
};

export function useController({
  controller,
  apiUrl,
  isSending,
  isReceiving,
}: {
  controller?: CopilotChatWidgetController;
  apiUrl: string;
  isSending: boolean;
  isReceiving: boolean;
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

  // Editing is controller-driven: delegate to the host when it provides
  // editQuery, otherwise disable it. Assigning here (even undefined) overrides
  // the provider's local fork+replace editQuery via the context spread, so a
  // controller without editQuery hides the edit affordance instead of mutating
  // the local conversation store.
  ctx.editQuery = controller.editQuery;

  if (controller.onNewConversation) {
    ctx.handleNewConversation = controller.onNewConversation;
  }

  if (controller.rerun) {
    ctx.rerun = controller.rerun;
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
