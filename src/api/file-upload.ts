import axios from "axios";
import { RequestModel } from "src/contexts/MessagesContext";
import { v4 as uuidv4 } from "uuid";

export const uploadPayloadFiles = async (
  payload: RequestModel,
  apiUrl: string,
) => {
  if (!payload.input_audio || typeof payload.input_audio === "string") return;
  // upload audio file to gooey
  const file = new File(
    [payload.input_audio],
    `gooey-widget-recording-${uuidv4()}.webm`,
  );
  payload.input_audio = await uploadFileToGooey(apiUrl, file);
};

export const uploadFileToGooey = async (apiUrl: string, file: File) => {
  let url = new URL("/__/file-upload/", apiUrl).toString();
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data?.url;
};
