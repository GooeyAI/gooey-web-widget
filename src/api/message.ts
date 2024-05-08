import axios from "axios";

const BASE_URL_VIDEO_BOTS = "https://api.gooey.ai/v2/video-bots";

const getHeaders = (secretKey: string) => {
  return {
    Authorization: "Bearer " + secretKey,
    "Content-Type": "application/json",
  };
};

export const sendMessageApi = (
  body: any,
  botId: string,
  secretKey: string,
  cancelToken: any,
) => {
  const headers = getHeaders(secretKey);
  return axios.post(`${BASE_URL_VIDEO_BOTS}/?example_id=${botId}`, body, {
    headers,
    cancelToken: cancelToken.token,
  });
};
