import axios from "axios";

const GOOEY_SERVER = process.env.REACT_APP_GOOEY_SERVER;
const BASE_URL_VIDEO_BOTS = `${GOOEY_SERVER}/v2/video-bots`;


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
