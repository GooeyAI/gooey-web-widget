import { createContext, useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSystemContext } from "./hooks";
import axios from "axios";
import {
  STREAM_MESSAGE_TYPES,
  getDataFromStream,
  getStreamUrlApi,
} from "src/api/streaming";
import { uploadFileToGooey } from "src/api/file-upload";

interface IncomingMsg {
  input_text?: string;
  input_audio?: string;
  conversation_id: string;
  citation_style: "symbol" | "number";
}

const CITATION_STYLE = "number";

const createNewQuery = (query: string | Blob, type: string) => {
  return {
    id: uuidv4(),
    [`input_${type}`]: query,
    role: "user",
    type: [type],
  };
};

export const MessagesContext: any = createContext({});

const MessagesContextProvider = (props: any) => {
  const { config } = useSystemContext();
  const [messages, setMessages] = useState(new Map());
  const [isSending, setIsSendingMessage] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const apiSource = useRef(axios.CancelToken.source());

  const currentStreamRef = useRef<any>(null);
  const scrollContainerRef = useRef<null | HTMLElement>(null);

  const initializeQuery = (payload: string | Blob, type: string = "text") => {
    const lastResponse: any = Array.from(messages.values()).pop(); // will get the data from last server msg
    const conversationId = lastResponse?.conversation_id;
    setIsSendingMessage(true);
    let newQuery = {};
    if (type === "text") newQuery = createNewQuery(payload, type);
    if (type === "audio")
      newQuery = createNewQuery(
        (URL || webkitURL).createObjectURL(payload as Blob),
        type
      );
    sendPrompt({
      [`input_${type}`]: payload,
      conversation_id: conversationId,
      citation_style: CITATION_STYLE,
    });
    addResponse(newQuery);
  };

  const addResponse = (response: any) => {
    setMessages((prev: any) => {
      return new Map(prev.set(response.id, response));
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
        scrollContainerRef?.current?.scrollHeight as number
      );
    }, 10);
  }, [scrollMessageContainer]);

  const updateStreamedMessage = useCallback(
    (payload: any) => {
      // stream start
      if (payload?.type === STREAM_MESSAGE_TYPES.CONVERSATION_START) {
        currentStreamRef.current = payload!.bot_message_id;
        setMessages((prev: any) => {
          const newConversations = new Map(prev);
          newConversations.set(payload!.bot_message_id, {
            id: currentStreamRef.current,
            ...payload,
          });
          return newConversations;
        });
        setIsSendingMessage(false);
        setIsReceiving(true);
        scrollToMessage();
      }

      // stream end
      if (
        payload?.type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE &&
        payload?.status === "completed"
      ) {
        setMessages((prev: any) => {
          const newConversations = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop(); // last message id
          const prevMessage = prev.get(lastResponseId);
          const { output, ...restPayload } = payload;
          newConversations.set(lastResponseId, {
            conversation_id: prevMessage?.conversation_id, // keep the conversation id
            id: currentStreamRef.current,
            ...output,
            ...restPayload,
          });
          return newConversations;
        });
        setIsReceiving(false);
        scrollToMessage();
      }

      // streaming data
      if (
        payload?.type === STREAM_MESSAGE_TYPES.MESSAGE_PART &&
        payload?.status === "running"
      ) {
        setMessages((prev: any) => {
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
        });
        scrollToMessage();
      }
    },
    [scrollToMessage]
  );

  const sendPrompt = async (payload: IncomingMsg) => {
    try {
      let audioUrl = "";
      if (payload?.input_audio) {
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
        ...payload,
      };
      const streamUrl = await getStreamUrlApi(payload, apiSource.current);
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

  const flushData = () => {
    setMessages(new Map());
    setIsSendingMessage(false);
  };

  const cancelApiCall = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (window?.GooeyEventSource) GooeyEventSource.close();
    else apiSource?.current.cancel("Operation canceled by the user.");
    // check if state has more than 2 message then remove the last one
    if (messages.size > 2) {
      const newMessages = new Map(messages);
      newMessages.delete(Array.from(messages.keys()).pop());
      setMessages(newMessages);
    } else flushData();
    apiSource.current = axios.CancelToken.source(); // set new cancel token for next api call
    setIsReceiving(false);
    setIsSendingMessage(false);
  };

  const valueMessages = {
    sendPrompt,
    messages,
    isSending,
    initializeQuery,
    preLoadData,
    flushData,
    cancelApiCall,
    scrollMessageContainer,
    scrollContainerRef,
    isReceiving,
  };

  return (
    <MessagesContext.Provider value={valueMessages}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
