import axios from "axios";

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

export const getDataFromStream = (sseUrl: string, setterFn: any) => {
  const evtSource = new EventSource(sseUrl);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.GooeyEventSource = evtSource;

  evtSource.addEventListener("close", () => {
    // close the event source
    evtSource.close();
    // set the state to null
    setterFn(null);
  });

  evtSource.addEventListener("error", (event: MessageEvent) => {
    let detail = "";
    try {
      if (event.data) {
        const parsed = JSON.parse(event.data);
        detail = parsed.detail || JSON.stringify(parsed);
      }
    } catch {
      detail = event.data || "";
    }

    setterFn({
      type: STREAM_MESSAGE_TYPES.ERROR,
      detail,
    });
    evtSource.close();
  });

  evtSource.onmessage = (event) => {
    // parse the message as JSON
    const data = JSON.parse(event.data);
    // update the state with the streamed message
    setterFn(data);
    // check if the message is the final response
    if (data.type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE) {
      // close the stream
      evtSource.close();
    }
  };
};
