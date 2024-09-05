import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSystemContext } from "./hooks";
import axios from "axios";
import {
  STREAM_MESSAGE_TYPES,
  getDataFromStream,
  createStreamApi,
} from "src/api/streaming";
import { uploadFileToGooey } from "src/api/file-upload";
import useConversations, {
  Conversation,
  updateLocalUser,
  USER_ID_LS_KEY,
} from "./ConversationLayer";
import { CHAT_INPUT_ID } from "src/widgets/copilot/components/ChatInput";

interface IncomingMsg {
  input_text?: string;
  input_audio?: string;
  conversation_id: string;
  citation_style: "symbol" | "number";
}

const CITATION_STYLE = "number";

const createNewQuery = (payload: any) => {
  return {
    ...payload,
    id: uuidv4(),
    role: "user",
  };
};

export const MessagesContext: any = createContext({});

const MessagesContextProvider = (props: any) => {
  const currentUserId = localStorage.getItem(USER_ID_LS_KEY) || "";
  const config = useSystemContext()?.config;
  const layoutController = useSystemContext()?.layoutController;
  const { conversations, handleAddConversation } = useConversations(
    currentUserId,
    config?.integration_id as string
  );

  const [messages, setMessages] = useState(new Map());
  const [isSending, setIsSendingMessage] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [isMessagesLoading, setMessagesLoading] = useState(true);
  const [preventAutoplay, setPreventAutoplay] = useState(true);

  const apiSource = useRef(axios.CancelToken.source());
  const currentStreamRef = useRef<any>(null);
  const scrollContainerRef = useRef<null | HTMLElement>(null);
  const currentConversation = useRef<Conversation | null>(null);

  const updateCurrentConversation = (conversation: Conversation) => {
    currentConversation.current = {
      ...currentConversation.current,
      ...conversation,
    };
  };

  const initializeQuery = (payload: any) => {
    setPreventAutoplay(false);
    // calls the server and updates the state with user message
    const lastResponse: any = Array.from(messages.values()).pop(); // will get the data from last server msg
    const conversationId = lastResponse?.conversation_id;
    setIsSendingMessage(true);
    const newQuery = createNewQuery(payload);
    sendPrompt({
      ...payload,
      conversation_id: conversationId,
      citation_style: CITATION_STYLE,
    });
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
    [scrollContainerRef]
  );

  const scrollToMessage = useCallback(() => {
    // scroll to the last message
    setTimeout(() => {
      scrollMessageContainer(
        scrollContainerRef?.current?.scrollHeight as number
      );
    }, 10);
  }, [scrollMessageContainer]);

  const updateStreamedMessage = useCallback(
    (payload: any) => {
      setMessages((prev: any) => {
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
              }
            )
          );
          return newMessages;
        }

        // streaming data
        if (payload?.type === STREAM_MESSAGE_TYPES.MESSAGE_PART) {
          const newConversations = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop(); // last messages id
          const prevMessage = prev.get(lastResponseId);
          const text = (prevMessage?.text || "") + (payload.text || "");
          newConversations.set(lastResponseId, {
            ...prevMessage,
            ...payload,
            id: currentStreamRef.current,
            text,
          });
          return newConversations;
        }
        return prev;
      });
      scrollToMessage();
    },
    [config?.integration_id, handleAddConversation, scrollToMessage]
  );

  const sendPrompt = async (payload: IncomingMsg) => {
    try {
      let audioUrl = "";
      if (payload?.input_audio) {
        // upload audio file to gooey
        const file = new File(
          [payload.input_audio],
          `gooey-widget-recording-${uuidv4()}.webm`
        );
        audioUrl = await uploadFileToGooey(file as File);
        payload.input_audio = audioUrl;
      }
      payload = {
        ...config?.payload,
        integration_id: config?.integration_id,
        user_id: currentUserId,
        ...payload,
      };
      const streamUrl = await createStreamApi(
        payload,
        apiSource.current,
        config?.apiUrl
      );
      getDataFromStream(streamUrl, updateStreamedMessage);
      // setLoading false in updateStreamedMessage
    } catch (err) {
      console.error("Api Failed!", err);
      setIsSendingMessage(false);
    }
  };

  const preLoadData = (data: any) => {
    const newMap = new Map();
    data.forEach((obj: any) => {
      newMap.set(obj.id, { ...obj });
    });
    setMessages(newMap);
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
    const ele = gooeyShadowRoot?.getElementById(CHAT_INPUT_ID);
    ele?.focus();
    setIsReceiving(false);
    setIsSendingMessage(false);
    purgeMessages();
  };

  const purgeMessages = () => {
    setMessages(new Map());
    currentConversation.current = {};
  };

  const cancelApiCall = () => {
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
  };

  const handleFeedbackClick = (button_id: string, context_msg_id: string) => {
    createStreamApi(
      {
        button_pressed: {
          button_id,
          context_msg_id,
        },
        integration_id: config?.integration_id,
      },
      apiSource.current
    );
    setMessages((prev: any) => {
      const newConversations = new Map(prev);
      const prevMessage = prev.get(context_msg_id);
      const newButtons = prevMessage.buttons.map((button: any) => {
        if (button.id === button_id) {
          return { ...button, isPressed: true };
        }
        return undefined; // hide the other buttons
      });
      newConversations.set(context_msg_id, {
        ...prevMessage,
        buttons: newButtons,
      });
      return newConversations;
    });
  };

  const setActiveConversation = useCallback(
    async (conversation: Conversation) => {
      if (
        !conversation ||
        !conversation.getMessages ||
        currentConversation.current?.id === conversation.id
      )
        return setMessagesLoading(false);
      setPreventAutoplay(true);
      setMessagesLoading(true);
      const messages = await conversation.getMessages();
      preLoadData(messages);
      updateCurrentConversation(conversation);
      setMessagesLoading(false);

      return messages;
    },
    []
  );

  useEffect(() => {
    setPreventAutoplay(true);
    if (!layoutController?.showNewConversationButton && conversations.length)
      // Load the latest conversation from DB
      setActiveConversation(conversations[0]);
    else setMessagesLoading(false);
    setTimeout(() => {
      setPreventAutoplay(false);
    }, 3000);
  }, [
    config,
    conversations,
    layoutController?.showNewConversationButton,
    setActiveConversation,
  ]);

  const valueMessages = {
    sendPrompt,
    messages,
    isSending,
    initializeQuery,
    handleNewConversation,
    cancelApiCall,
    scrollMessageContainer,
    scrollContainerRef,
    isReceiving,
    handleFeedbackClick,
    conversations,
    setActiveConversation,
    currentConversationId: currentConversation.current?.id || null,
    isMessagesLoading,
    preventAutoplay,
  };

  return (
    <MessagesContext.Provider value={valueMessages}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
