import { useCallback, useRef } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import * as Sentry from "@sentry/react";
import { getDataFromStream, createStreamApi } from "src/api/streaming";
import {
  STREAM_MESSAGE_STATUS,
  STREAM_MESSAGE_TYPES,
} from "src/api/streaming-types";
import { uploadPayloadFiles } from "src/api/file-upload";
import { handleToolCall } from "../tools";
import { buildAssistantErrorMessage } from "./errorHandling";

type StreamingHandlerParams = {
  config: any;
  finalizeConversation: (
    messages: Map<string, any>,
    metadata?: { title?: string; timestamp?: string },
  ) => void;
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
  finalizeConversation,
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
  const hasErrorRef = useRef(false);

  const updateStreamedMessage = useCallback(
    (payload: any) => {
      setMessages((prev: any) => {
        // stream close — skip if already errored
        if (!payload) {
          if (hasErrorRef.current) return prev;
          const newMessages = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop();
          const prevMessage = prev.get(lastResponseId);
          const text = prevMessage?.text || "";
          newMessages.set(lastResponseId, {
            ...prevMessage,
            output_text: [text],
            type: STREAM_MESSAGE_TYPES.FINAL_RESPONSE,
            status: STREAM_MESSAGE_STATUS.COMPLETED,
          });
          setIsReceiving(false);
          return newMessages;
        }

        // helper to mark the last message as errored and stop receiving.
        // if the last message is the user's message (no bot message yet),
        // append a new assistant error message instead of overwriting it.
        const markLastAsError = (errorDetail: string) => {
          hasErrorRef.current = true;
          const newMessages = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop();
          const prevMessage = prev.get(lastResponseId);
          if (!prevMessage || prevMessage.role === "user") {
            const errorMessage = buildAssistantErrorMessage(errorDetail);
            newMessages.set(errorMessage.id, errorMessage);
          } else {
            newMessages.set(lastResponseId, {
              ...prevMessage,
              type: STREAM_MESSAGE_TYPES.ERROR,
              error_detail: errorDetail,
              status: STREAM_MESSAGE_STATUS.FAILED,
            });
          }
          setIsReceiving(false);
          return newMessages;
        };

        // stream error
        if (payload?.type === STREAM_MESSAGE_TYPES.ERROR) {
          return markLastAsError(payload.detail || "");
        }

        // message_part with status=failed is an error
        if (
          payload?.type === STREAM_MESSAGE_TYPES.MESSAGE_PART &&
          payload?.status === STREAM_MESSAGE_STATUS.FAILED
        ) {
          return markLastAsError(payload.text || payload.detail || "");
        }

        // once errored, ignore all further stream messages
        if (hasErrorRef.current) return prev;

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

        // run started
        if (payload?.type === STREAM_MESSAGE_TYPES.RUN_START) {
          const newMessages = new Map(prev);
          const lastResponseId: any = Array.from(prev.keys()).pop();
          const prevMessage = prev.get(lastResponseId);
          if (!prevMessage) return prev;
          newMessages.set(lastResponseId, {
            ...prevMessage,
            ...payload,
          });
          return newMessages;
        }

        // stream end
        if (
          payload?.type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE &&
          payload?.status === STREAM_MESSAGE_STATUS.COMPLETED
        ) {
          const newMessages: Map<string, any> = new Map(prev);
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

          // Track this as a newly received message for autoplay
          setLatestMessageIds((prev) =>
            new Set(prev).add(currentStreamRef.current),
          );

          // update current conversation for every time the stream ends
          finalizeConversation(newMessages, {
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
          if (!prevMessage) return prev;
          const text = (prevMessage.text || "") + (payload.text || "");
          const buttons = [
            ...(prevMessage.buttons || []),
            ...(payload.buttons || []),
          ];
          let final_prompt = prevMessage.final_prompt || [];
          for (let [idx, value] of Object.entries(payload.prompt_delta || {})) {
            final_prompt[idx] = value;
            try {
              handleToolCall(value, prevMessage.web_url);
            } catch (e) {
              Sentry.captureException(e, { extra: { toolCallValue: value } });
            }
          }
          newConversations.set(lastResponseId, {
            ...prevMessage,
            ...payload,
            id: currentStreamRef.current,
            text,
            buttons,
            final_prompt,
          });
          return newConversations;
        }

        return prev;
      });
      scrollToMessage();
    },
    [
      finalizeConversation,
      scrollToMessage,
      setIsReceiving,
      setIsSendingMessage,
      setLatestMessageIds,
      setMessages,
      updateLocalUser,
    ],
  );

  const sendPayload = useCallback(
    async (payload: any, callbacks?: { onFinally?: () => void }) => {
      hasErrorRef.current = false;
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
