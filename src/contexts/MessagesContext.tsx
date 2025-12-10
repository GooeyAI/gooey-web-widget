import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSystemContext } from "./hooks";
import axios from "axios";
import {
  STREAM_MESSAGE_TYPES,
  getDataFromStream,
  createStreamApi,
} from "src/api/streaming";
import { uploadPayloadFiles } from "src/api/file-upload";
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
import { handleToolCalls } from "./tools";
import * as Sentry from "@sentry/react";

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
  conversations?: Conversation[];
  setActiveConversation?: (conversation: Conversation) => Promise<void>;
  currentConversationId?: string | null;
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

  const [messages, setMessages] = useState(new Map());
  const [isSending, setIsSendingMessage] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [isMessagesLoading, setMessagesLoading] = useState(true);
  const [latestMessageIds, setLatestMessageIds] = useState(new Set<string>());
  const [preAttachedFileUsed, setPreAttachedFileUsed] = useState(false);

  const apiSource = useRef(axios.CancelToken.source());
  const currentStreamRef = useRef<any>(null);
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
    const conversationId = currentConversation.current?.id;
    setIsSendingMessage(true);
    sendPayload({
      ...payload,
      conversation_id: conversationId,
      citation_style: CITATION_STYLE,
      user_id: currentUserId,
    });
    const newQuery = createNewQuery(payload);
    addResponse(newQuery);
  };

  const addResponse = (response: any) => {
    setMessages((prev: any) => {
      const newMessages = new Map(prev.set(response.id, response));
      return newMessages;
    });
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

  const updateStreamedMessage = useCallback(
    (payload: any) => {
      setMessages((prev: any) => {
        // stream close
        if (!payload || payload?.type === STREAM_MESSAGE_TYPES.ERROR) {
          const newMessages = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop(); // last message id
          const prevMessage = prev.get(lastResponseId);
          const text = (prevMessage?.text || "") + (payload?.text || "");
          newMessages.set(lastResponseId, {
            ...prevMessage,
            output_text: [text],
            type: STREAM_MESSAGE_TYPES.FINAL_RESPONSE,
            status: "completed",
          });
          setIsReceiving(false);
          return newMessages;
        }

        // stream start
        if (payload?.type === STREAM_MESSAGE_TYPES.CONVERSATION_START) {
          setIsSendingMessage(false);
          setIsReceiving(true);
          currentStreamRef.current = payload!.bot_message_id;
          const newMessages = new Map(prev);
          newMessages.set(payload!.bot_message_id, {
            id: currentStreamRef.current,
            ...payload,
          });
          updateLocalUser(payload?.user_id);
          return newMessages;
        }

        // stream end
        if (
          payload?.type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE &&
          payload?.status === "completed"
        ) {
          const newMessages = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop(); // last message id
          const prevMessage = prev.get(lastResponseId);
          const { output, ...restPayload } = payload;
          newMessages.set(lastResponseId, {
            ...prevMessage,
            conversation_id: prevMessage?.conversation_id, // keep the conversation id
            id: currentStreamRef.current,
            ...output,
            ...restPayload,
          });
          setIsReceiving(false);

          try {
            handleToolCalls(output);
          } catch (e) {
            console.error("Error handling tool calls", e);
          }

          // Track this as a newly received message for autoplay
          setLatestMessageIds((prev) =>
            new Set(prev).add(currentStreamRef.current),
          );

          // update current conversation for every time the stream ends
          const conversationData = {
            id: prevMessage?.conversation_id,
            user_id: prevMessage?.user_id,
            title: payload?.title,
            timestamp: payload?.created_at,
            bot_id: config?.integration_id,
          };
          updateCurrentConversation(conversationData);
          handleAddConversation(
            Object.assign(
              {},
              {
                ...conversationData,
                messages: Array.from(newMessages.values()),
              },
            ),
          );
          return newMessages;
        }

        // streaming data
        if (payload?.type === STREAM_MESSAGE_TYPES.MESSAGE_PART) {
          const newConversations = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop(); // last messages id
          const prevMessage = prev.get(lastResponseId);
          const text = (prevMessage?.text || "") + (payload.text || "");
          const buttons = [
            ...(prevMessage?.buttons || []),
            ...(payload.buttons || []),
          ];
          newConversations.set(lastResponseId, {
            ...prevMessage,
            ...payload,
            id: currentStreamRef.current,
            text,
            buttons,
          });
          return newConversations;
        }

        return prev;
      });
      scrollToMessage();
    },
    [config?.integration_id, handleAddConversation, scrollToMessage],
  );

  const sendPayload = async (payload: RequestModel) => {
    try {
      await uploadPayloadFiles(payload, config!.apiUrl!);

      // Prepare config payload, removing input_images if pre-attached files have been used
      const configPayload = { ...config?.payload };
      if (preAttachedFileUsed && configPayload.input_images) {
        delete configPayload.input_images;
      }

      payload = {
        ...configPayload,
        integration_id: config?.integration_id,
        user_id: currentUserId,
        ...payload,
      };

      const streamUrl = await createStreamApi(
        config!.apiUrl!,
        payload,
        apiSource.current,
      );
      getDataFromStream(streamUrl, updateStreamedMessage);
      // setLoading false in updateStreamedMessage
    } catch (e) {
      // report error to Sentry
      Sentry.captureException(e);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const preLoadData = (data: any) => {
    const newMap = new Map();
    data.forEach((obj: any) => {
      if (!obj.id) obj.id = uuidv4();
      newMap.set(obj.id, { ...obj });
    });
    setMessages(newMap);
    // Clear newly received message IDs when loading existing conversations
    setLatestMessageIds(new Set());
  };

  const handleNewConversation = () => {
    if (!isReceiving && !isSending) {
      handleAddConversation(Object.assign({}, currentConversation.current));
    } else {
      cancelApiCall();
      handleAddConversation(Object.assign({}, currentConversation.current));
    }
    if (isReceiving || isSending) cancelApiCall();
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
    setMessages(new Map());
    setLatestMessageIds(new Set());
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
      conversations.length &&
      !messages.size
    )
      // Load the latest conversation from DB - initial load when multuiple conversations are disabled
      setActiveConversation(conversations[0]);
    else if (config?.conversationData) {
      console.log(config?.conversationData, ">>>");
      setActiveConversation(config?.conversationData);
      config.conversationData = null;
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
    currentConversationId: currentConversation.current?.id || null,
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
