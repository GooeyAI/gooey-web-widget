import axios from "axios";

const GOOEY_SERVER = process.env.REACT_APP_GOOEY_SERVER;
const BASE_URL_STREAMING = `${GOOEY_SERVER}/v3/integrations/stream/`;

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
};

export const createStreamApi = async (
  body: any,
  cancelToken: any,
  apiUrl: string = ""
) => {
  const headers = getHeaders();
  const finalBody = {
    citation_style: "number",
    use_url_shortener: false,
    ...body,
  }; // force number citation style
  const response: any = await axios.post(
    apiUrl || BASE_URL_STREAMING,
    JSON.stringify(finalBody),
    {
      headers,
      responseType: "stream",
      cancelToken: cancelToken.token,
    }
  );
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
    // parse the error message as JSON
    const { detail } = JSON.parse(event.data);
    // display the error message
    setterFn({
      type: STREAM_MESSAGE_TYPES.MESSAGE_PART,
      text: `<p className="text-gooeyDanger font_14_400">${detail}</p>`,
    });
    // close the event source
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
