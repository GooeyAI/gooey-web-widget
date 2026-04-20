import axios from "axios";
import { RequestModel } from "src/contexts/MessagesContext";
import { v4 as uuidv4 } from "uuid";

// Uploads any unsent files in the payload (audio Blob, and File entries in
// input_images / input_documents), replacing each with the uploaded URL.
// Errors propagate to the caller so handleSendError can surface them in the
// chat UI.
export const uploadPayloadFiles = async (
  payload: RequestModel,
  apiUrl: string,
) => {
  const jobs: Promise<void>[] = [];

  if (payload.input_audio && typeof payload.input_audio !== "string") {
    jobs.push(
      (async () => {
        const blob = payload.input_audio as Blob;
        const file = new File(
          [blob],
          `gooey-widget-recording-${uuidv4()}.webm`,
        );
        payload.input_audio = await uploadFileToGooey(apiUrl, file);
      })(),
    );
  }

  jobs.push(uploadArrayField(payload, "input_images", apiUrl));
  jobs.push(uploadArrayField(payload, "input_documents", apiUrl));

  await Promise.all(jobs);
};

// Replaces any File entries in payload[key] with uploaded URLs, leaving
// string entries (pre-uploaded CDN URLs) untouched.
const uploadArrayField = async (
  payload: RequestModel,
  key: "input_images" | "input_documents",
  apiUrl: string,
) => {
  const items = payload[key];
  if (!Array.isArray(items) || !items.length) return;
  payload[key] = await Promise.all(
    items.map((item) =>
      item instanceof File ? uploadFileToGooey(apiUrl, item) : item,
    ),
  );
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
  const uploadedUrl = res?.data?.url;
  if (typeof uploadedUrl !== "string" || !uploadedUrl) {
    throw new Error("File upload succeeded but response had no url");
  }
  return uploadedUrl;
};
