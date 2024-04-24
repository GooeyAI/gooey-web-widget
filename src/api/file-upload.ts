import axios from "axios";

const GOOEY_FILE_API_URL = "https://gooey.ai/__/file-upload/";
export const uploadFileToGooey = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(GOOEY_FILE_API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data?.url;
};
