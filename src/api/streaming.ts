import axios from "axios";

const BASE_URL_STREAMING = "https://api.gooey.ai/v3/integrations/stream/";

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

export const getStreamUrlApi = async (
  body: any,
  botId: string,
  cancelToken: any
) => {
  const headers = getHeaders();
  const _body = {
    // your integration's ID as shown in the Gooey.AI Integrations tab
    integration_id: botId,
    // the input text for the bot
    ...body,
  };
  const response: any = await axios.post(
    BASE_URL_STREAMING,
    JSON.stringify(_body),
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
  evtSource.onmessage = (event) => {
    // parse the message as JSON
    const data = JSON.parse(event.data);
    // check if the message is the final response
    if (data.type === STREAM_MESSAGE_TYPES.FINAL_RESPONSE) {
      // close the stream
      setterFn(data);
      evtSource.close();
    } else {
      // update the state with the streamed message
      setterFn(data);
    }
  };
};
