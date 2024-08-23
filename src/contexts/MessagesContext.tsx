import { createContext, useCallback, useRef, useState } from "react";
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
} from "./ConversationLayer";

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
  const currentUserId = localStorage.getItem("user_id") || "";
  const config = useSystemContext()?.config;
  const { conversations, handleAddConversation } = useConversations(
    "ConversationsDB",
    currentUserId
  );

  const [messages, setMessages] = useState(new Map());
  const [isSending, setIsSendingMessage] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const apiSource = useRef(axios.CancelToken.source());

  const currentStreamRef = useRef<any>(null);
  const scrollContainerRef = useRef<null | HTMLElement>(null);
  const currentConversation = useRef<Conversation | null>(null);

  const updateCurrentConversation = (conversation: Conversation) => {
    // called 2 times - updateStreamedMessage & addResponse
    currentConversation.current = {
      ...currentConversation.current,
      ...conversation,
    };
  };

  const initializeQuery = (payload: any) => {
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
          const newConversations = new Map(prev);
          newConversations.set(payload!.bot_message_id, {
            id: currentStreamRef.current,
            ...payload,
          });
          updateLocalUser(payload?.user_id);
          return newConversations;
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
          updateCurrentConversation({
            id: prevMessage?.conversation_id,
            user_id: prevMessage?.user_id,
            messages: Array.from(newMessages.values()),
            title: payload?.title,
            timestamp: payload?.created_at,
          });
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
    [scrollToMessage]
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
    handleAddConversation(Object.assign({}, currentConversation.current));
    if (isReceiving || isSending) cancelApiCall();
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
    // check if state is loading then remove the last one
    if (isReceiving || isSending) {
      const newMessages = new Map(messages);
      const idsArray = Array.from(messages.keys());
      // delete user message
      newMessages.delete(idsArray[idsArray.length - 2]);
      // delete server message
      newMessages.delete(idsArray.pop());
      setMessages(newMessages);
    } else purgeMessages();
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

  const setActiveConversation = (conversation: Conversation) => {
    currentConversation.current = conversation;
    preLoadData(conversation.messages);
  };

  const valueMessages = {
    sendPrompt,
    messages,
    isSending,
    initializeQuery,
    preLoadData,
    handleNewConversation,
    cancelApiCall,
    scrollMessageContainer,
    scrollContainerRef,
    isReceiving,
    handleFeedbackClick,
    conversations,
    setActiveConversation,
    currentConversationId: currentConversation.current?.id || null,
  };

  return (
    <MessagesContext.Provider value={valueMessages}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
