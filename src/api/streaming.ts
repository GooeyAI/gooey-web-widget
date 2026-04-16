import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import {
  ERROR_MESSAGES,
  extractFetchErrorDetail,
} from "src/contexts/messages/errorHandling";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export const STREAM_MESSAGE_TYPES = {
  CONVERSATION_START: "conversation_start",
  FINAL_RESPONSE: "final_response",
  RUN_START: "run_start",
  RUNNING: "running",
  COMPLETED: "completed",
  MESSAGE_PART: "message_part",
  ERROR: "error",
};

export const createStreamApi = async (
  apiUrl: string,
  body: any,
  cancelToken: any,
) => {
  let url = new URL("/v3/integrations/stream/", apiUrl).toString();
  const headers = getHeaders();
  const finalBody = {
    citation_style: "number",
    use_url_shortener: false,
    ...body,
  }; // force number citation style
  const response: any = await axios.post(url, JSON.stringify(finalBody), {
    headers,
    responseType: "stream",
    cancelToken: cancelToken.token,
  });
  return response.headers.get("Location");
};

// Thrown from onopen to signal a non-retryable HTTP error (4xx/5xx).
class FatalStreamError extends Error {}

export const getDataFromStream = async (sseUrl: string, setterFn: any) => {
  const abortController = new AbortController();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error — exposed globally so cancelApiCall() can abort the stream
  window.GooeyEventSource = { close: () => abortController.abort() };

  try {
    await fetchEventSource(sseUrl, {
      signal: abortController.signal,
      openWhenHidden: true,
      onopen: async (response) => {
        if (!response.ok) {
          throw new FatalStreamError(await extractFetchErrorDetail(response));
        }
      },
      onmessage: (msg) => {
        if (msg.event === "close") {
          setterFn(null);
          abortController.abort();
          return;
        }
        if (!msg.data) return;
        try {
          const parsed = JSON.parse(msg.data);
          setterFn(parsed);
          if (parsed.type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE) {
            abortController.abort();
          }
        } catch {
          // ignore malformed frames
        }
      },
      onerror: (err) => {
        // Throwing aborts the auto-retry loop.
        throw err;
      },
    });
  } catch (e: any) {
    if (abortController.signal.aborted && !(e instanceof FatalStreamError)) {
      return;
    }
    setterFn({
      type: STREAM_MESSAGE_TYPES.ERROR,
      detail: e?.message || ERROR_MESSAGES.STREAM_CONNECTION_FAILED,
    });
  }
};
