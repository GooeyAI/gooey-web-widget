import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSystemContext } from "./hooks";
import axios from "axios";
import useConversations, {
  Conversation,
  updateLocalUser,
  USER_ID_LS_KEY,
} from "./ConversationLayer";
import { CHAT_INPUT_ID } from "src/widgets/copilot/components/ChatInput";
import {
  CopilotChatWidgetController,
  useController,
} from "src/contexts/ControllerUtils";
import * as Sentry from "@sentry/react";
import { useMessageStore } from "./messages/useMessageStore";
import { useStreamingHandler } from "./messages/useStreamingHandler";

const CITATION_STYLE = "number";

const createNewQuery = (payload: RequestModel) => {
  return {
    ...payload,
    id: uuidv4(),
    role: "user",
  };
};

export const MessagesContext = createContext<MessagesContextType>({});

export interface MessagesContextType {
  messages?: Map<string, MessageMishmash>;
  isSending?: boolean;
  initializeQuery?: (payload: RequestModel) => void;
  handleNewConversation?: () => void;
  cancelApiCall?: () => void;
  scrollMessageContainer?: (y?: number) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  isReceiving?: boolean;
  conversations?: Conversation[] | null;
  setActiveConversation?: (conversation: Conversation) => Promise<void>;
  currentConversation?: Conversation | null;
  isMessagesLoading?: boolean;
  latestMessageIds?: Set<string>;
  preAttachedFileUsed?: boolean;
  setPreAttachedFileUsed?: (used: boolean) => void;
}

// --- Event Type Definitions ---

export interface ConversationStart {
  type: "conversation_start";
  conversation_id: string;
  user_id: string;
  user_message_id: string;
  bot_message_id: string;
  created_at: string;
}

export interface RunStart {
  type: "run_start";
  // Add any additional fields as needed
  // status_url?: string;
}

export interface MessagePart {
  type: "message_part";
  status: string; // or a specific enum type if you have one
  detail: string;
  references?: SearchReference[];
  text?: string;
  audio?: string;
  video?: string;
  buttons?: ReplyButton[];
  documents?: string[];
}

export interface FinalResponse {
  type: "final_response";

  run_time_sec?: number;
  status?: string;
  detail?: string;

  /*
  These fields below are not supposed to be inlined but for some unknown reason they are.
  They must be in a nested `output` field to match the backend API

  output?: CopilotOutput | null;
  */

  final_prompt: string | unknown[];
  output_text: string[];
  output_audio: string[];
  output_video: string[];

  // intermediate text
  raw_input_text?: string | null;
  raw_tts_text?: string[] | null;
  raw_output_text?: string[] | null;

  // doc search
  references?: SearchReference[] | null;
  final_search_query?: string | null;
  final_keyword_query?: string | string[] | null;

  // output_documents?: string[] | null;
  // reply_buttons?: ReplyButton[] | null;

  finish_reason?: string[] | null;
}

export interface StreamError {
  type: "error";
  detail: string;
}

// --- Supporting Types ---

export interface ReplyButton {
  id: string;
  title: string;
  action?: string;
  payload?: Record<string, unknown>;
}

export interface SearchReference {
  url: string;
  title: string;
  snippet: string;
  score: number;
}

export interface OpenAPIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface RequestModel {
  conversation_id?: string;
  user_id?: string;
  button_pressed?: {
    button_id: string;
    context_msg_id: string;
    button_title?: string | null;
  };
  input_location?: {
    latitude?: number;
    longitude?: number;
  };
  input_prompt?: string;
  input_audio?: Blob | string;
  input_images?: string[];
  input_documents?: string[];
  citation_style?: string;
  messages?: OpenAPIMessage[];
}

// This is absolutely disgusting, but it works
export type MessageMishmash = {
  id: string;
  role: "user" | "assistant";
} & (
  | RequestModel
  | ConversationStart
  | RunStart
  | MessagePart
  | FinalResponse
  | StreamError
);

const MessagesContextProvider = ({
  controller,
  shadowRoot,
  children,
}: {
  controller?: CopilotChatWidgetController;
  shadowRoot: ShadowRoot | undefined;
  children: React.ReactNode;
}) => {
  const currentUserId = localStorage.getItem(USER_ID_LS_KEY) || "";
  const { config, layoutController } = useSystemContext();
  const { conversations, handleAddConversation } = useConversations(
    currentUserId,
    config?.integration_id as string,
  );

  const {
    messages,
    setMessages,
    latestMessageIds,
    setLatestMessageIds,
    preAttachedFileUsed,
    setPreAttachedFileUsed,
    addResponse,
    preLoadData,
    purgeMessages: purgeMessagesStore,
  } = useMessageStore();
  const [isSending, setIsSendingMessage] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [isMessagesLoading, setMessagesLoading] = useState(true);
  const [isSharedConversation, setIsSharedConversation] = useState(false);

  const apiSource = useRef(axios.CancelToken.source());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const currentConversation = useRef<Conversation | null>(null);

  const updateCurrentConversation = (conversation: Conversation) => {
    currentConversation.current = {
      ...currentConversation.current,
      ...conversation,
    };
  };

  const initializeQuery = (payload: RequestModel) => {
    if (!payload || isSending || isReceiving) return;
    // Clear any previously received message IDs when starting a new query
    setLatestMessageIds(new Set());

    // calls the server and updates the state with user message
    const conversationId = isSharedConversation
      ? undefined
      : currentConversation.current?.id;
    setIsSendingMessage(true);
    if (!conversationId && isSharedConversation) {
      // make messages array in payload from messages in currentConversation and add
      payload.messages = currentConversation.current?.messages?.map(
        (message) => ({
          id: message.id,
          role: message.role,
          content:
            message.role === "user"
              ? message.input_prompt || ""
              : message.raw_output_text?.[0] || "",
        }),
      );
    }
    setIsSharedConversation(false); //reset shared conversation flag
    sendPayload(
      {
        ...payload,
        conversation_id: conversationId,
        citation_style: CITATION_STYLE,
        user_id: currentUserId,
      },
      { onFinally: () => setIsSendingMessage(false) },
    ).catch((e) => {
      // report error to Sentry
      Sentry.captureException(e);
    });
    const newQuery = createNewQuery(payload);
    addResponse(newQuery);
  };

  const scrollMessageContainer = useCallback(
    (y: number = 0) => {
      // scroll to y position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scroll({
          top: y,
          behavior: "smooth",
        });
      }
    },
    [scrollContainerRef],
  );

  const scrollToMessage = useCallback(() => {
    // scroll to the last message
    setTimeout(() => {
      scrollMessageContainer(
        scrollContainerRef?.current?.scrollHeight as number,
      );
    }, 10);
  }, [scrollMessageContainer]);

  useEffect(() => {
    scrollToMessage();
  }, [scrollToMessage]);

  const { sendPayload } = useStreamingHandler({
    config,
    handleAddConversation,
    updateCurrentConversation,
    scrollToMessage,
    setIsReceiving,
    setIsSendingMessage,
    setLatestMessageIds,
    setMessages,
    apiSource,
    currentUserId,
    preAttachedFileUsed,
    updateLocalUser,
  });

  const handleNewConversation = () => {
    if (isReceiving || isSending) {
      cancelApiCall();
    }
    if (layoutController?.isMobile && layoutController?.isSidebarOpen)
      layoutController?.toggleSidebar();
    setIsReceiving(false);
    setIsSendingMessage(false);
    setPreAttachedFileUsed(false); // Reset for new conversation
    purgeMessages();
    const ele = shadowRoot?.getElementById(CHAT_INPUT_ID);
    ele?.focus();
  };

  const purgeMessages = () => {
    purgeMessagesStore();
    currentConversation.current = {};
  };

  const cancelApiCall = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (window?.GooeyEventSource) GooeyEventSource.close();
    else apiSource?.current.cancel("Operation canceled by the user.");

    if (!isReceiving && !isSending) {
      apiSource.current = axios.CancelToken.source(); // set new cancel token for next api call
    }
    // delete last message from the state
    const newMessages = new Map(messages);
    const idsArray = Array.from(messages.keys());
    // check if state is loading then remove the last one
    if (isSending) {
      newMessages.delete(idsArray.pop());
      setMessages(newMessages);
    }

    if (isReceiving) {
      newMessages.delete(idsArray.pop()); // delete server message
      newMessages.delete(idsArray.pop()); // delete user message
      setMessages(newMessages);
    }

    updateCurrentConversation({
      messages: Array.from(newMessages.values()),
    });

    apiSource.current = axios.CancelToken.source(); // set new cancel token for next api call
    setIsReceiving(false);
    setIsSendingMessage(false);
  }, [isReceiving, isSending, messages]);

  const setActiveConversation = useCallback(
    async (conversation: Conversation) => {
      if (isSending || isReceiving) cancelApiCall();
      if (!conversation || currentConversation.current?.id === conversation.id)
        return setMessagesLoading(false);
      setMessagesLoading(true);
      let messages = [];
      if (!conversation.getMessages && conversation.messages) {
        messages = conversation.messages;
      } else if (conversation.getMessages) {
        messages = await conversation.getMessages();
      }
      preLoadData(messages);
      updateCurrentConversation(conversation);
      setMessagesLoading(false);
    },
    [cancelApiCall, isReceiving, isSending],
  );

  useEffect(() => {
    if (
      !layoutController?.showNewConversationButton &&
      conversations &&
      conversations.length &&
      !messages.size
    )
      // Load the latest conversation from DB - initial load when multuiple conversations are disabled
      setActiveConversation(conversations[0]);
    else if (config?.conversationData) {
      if (!conversations) return;
      // shared conversation preloading logic
      const existingConversation =
        conversations &&
        conversations.find(
          (conversation) => conversation.id === config?.conversationData?.id,
        );

      // checks conversation.id is already in the conversations DB, set it as the active conversation
      if (existingConversation) {
        setActiveConversation(existingConversation);
        config.conversationData = null;
      } else {
        // new conversation and user
        setActiveConversation(config?.conversationData);
        setIsSharedConversation(true); // for new conversation and user
        config.conversationData = null;
        setMessagesLoading(false);
      }
    } else setMessagesLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  let controllerContext = useController({
    controller,
    apiUrl: config!.apiUrl!,
    isSending,
    isReceiving,
    scrollToMessage,
  });

  let context: MessagesContextType = {
    messages,
    isSending,
    initializeQuery,
    handleNewConversation,
    cancelApiCall,
    scrollMessageContainer,
    scrollContainerRef,
    isReceiving,
    conversations,
    setActiveConversation,
    currentConversation: currentConversation.current || null,
    isMessagesLoading,
    latestMessageIds,
    preAttachedFileUsed,
    setPreAttachedFileUsed,
    ...controllerContext,
  };

  return (
    <MessagesContext.Provider value={context}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
