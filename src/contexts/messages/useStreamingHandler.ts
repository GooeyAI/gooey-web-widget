import { useCallback, useRef } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import {
  STREAM_MESSAGE_TYPES,
  getDataFromStream,
  createStreamApi,
} from "src/api/streaming";
import { uploadPayloadFiles } from "src/api/file-upload";
import { handleToolCalls } from "../tools";

type StreamingHandlerParams = {
  config: any;
  handleAddConversation: (conversation: any) => void;
  updateCurrentConversation: (conversation: any) => void;
  scrollToMessage: () => void;
  setIsReceiving: (value: boolean) => void;
  setIsSendingMessage: (value: boolean) => void;
  setLatestMessageIds: Dispatch<SetStateAction<Set<string>>>;
  setMessages: Dispatch<any>;
  apiSource: MutableRefObject<any>;
  currentUserId: string;
  preAttachedFileUsed: boolean;
  updateLocalUser: (userId: string) => void;
};

export const useStreamingHandler = ({
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
}: StreamingHandlerParams) => {
  const currentStreamRef = useRef<any>(null);

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
          setLatestMessageIds((prev) => new Set(prev).add(currentStreamRef.current));

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
            tool_calls: payload.tool_calls || prevMessage?.tool_calls || [],
          });
          return newConversations;
        }

        return prev;
      });
      scrollToMessage();
    },
    [
      config?.integration_id,
      handleAddConversation,
      scrollToMessage,
      setIsReceiving,
      setIsSendingMessage,
      setLatestMessageIds,
      setMessages,
      updateCurrentConversation,
      updateLocalUser,
    ],
  );

  const sendPayload = useCallback(
    async (payload: any, callbacks?: { onFinally?: () => void }) => {
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
        // Note: capture handled in caller to avoid moving sentry dependency here
        throw e;
      } finally {
        callbacks?.onFinally?.();
      }
    },
    [
      apiSource,
      config,
      currentUserId,
      preAttachedFileUsed,
      updateStreamedMessage,
    ],
  );

  return {
    currentStreamRef,
    updateStreamedMessage,
    sendPayload,
  };
};
