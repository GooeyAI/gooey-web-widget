import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import * as Sentry from "@sentry/react";
import { STREAM_MESSAGE_TYPES } from "./streaming-types";
import {
  ERROR_MESSAGES,
  extractFetchErrorDetail,
} from "src/contexts/messages/errorHandling";

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
// Keeps the Response metadata so downstream reporters (Sentry) see the
// status code and URL, not just the flattened message.
class FatalStreamError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  constructor(message: string, response: Response) {
    super(message);
    this.name = "FatalStreamError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
  }
}

// Per-widget SSE registry — replaces the old `window.GooeyEventSource`
// global so multiple widgets on the same page don't race each other's
// cancellations. Entries are added on `getDataFromStream` entry and
// removed in `finally`, so `cancelStream` is a no-op when no stream is
// currently active for that widget.
const activeStreams = new Map<string, AbortController>();

// Aborts the currently active SSE for `widgetId`, if any. Returns true
// when a stream was actually aborted so callers can fall back to a
// different cancellation path (e.g. axios cancel token) when this is a
// no-op.
export const cancelStream = (widgetId: string): boolean => {
  const ac = activeStreams.get(widgetId);
  if (!ac) return false;
  ac.abort();
  activeStreams.delete(widgetId);
  return true;
};

export const getDataFromStream = async (
  sseUrl: string,
  setterFn: any,
  widgetId: string,
) => {
  const abortController = new AbortController();
  // If a prior stream for this widget is somehow still registered
  // (shouldn't happen — the previous call's `finally` clears it), abort
  // it before installing the new one.
  const previous = activeStreams.get(widgetId);
  if (previous) previous.abort();
  activeStreams.set(widgetId, abortController);

  try {
    await fetchEventSource(sseUrl, {
      signal: abortController.signal,
      openWhenHidden: true,
      onopen: async (response) => {
        if (!response.ok) {
          const { uiDetail, rawBody } = await extractFetchErrorDetail(response);
          const fatal = new FatalStreamError(uiDetail, response);
          Sentry.captureException(fatal, {
            extra: {
              status: fatal.status,
              statusText: fatal.statusText,
              url: fatal.url,
              body: rawBody,
            },
          });
          throw fatal;
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
        } catch (err) {
          // Malformed frame — report and continue so one bad chunk
          // doesn't take down the rest of the stream.
          Sentry.captureException(err, {
            extra: { sseData: msg.data, sseEvent: msg.event },
          });
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
    // A DOMException with name "AbortError" is thrown when we abort on
    // FINAL_RESPONSE, the "close" event, or a user-initiated cancel —
    // none of those are real errors.
    if (e?.name === "AbortError") return;
    setterFn({
      type: STREAM_MESSAGE_TYPES.ERROR,
      detail: e?.message || ERROR_MESSAGES.STREAM_CONNECTION_FAILED,
    });
  } finally {
    // Only clear our own controller — if a later `getDataFromStream`
    // already replaced the entry, leave it alone.
    if (activeStreams.get(widgetId) === abortController) {
      activeStreams.delete(widgetId);
    }
  }
};
