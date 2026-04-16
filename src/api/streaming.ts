import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { STREAM_MESSAGE_TYPES } from "./streaming-types";
import {
  ERROR_MESSAGES,
  extractFetchErrorDetail,
} from "src/contexts/messages/errorHandling";

export { STREAM_MESSAGE_TYPES } from "./streaming-types";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
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
      onclose: () => {
        // Server closed the connection without an explicit "close" frame.
        // Unwind state so the UI doesn't hang in a "receiving" mode.
        setterFn(null);
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
