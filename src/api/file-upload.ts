import axios from "axios";

const GOOEY_SERVER = process.env.REACT_APP_GOOEY_SERVER;
const GOOEY_FILE_API_URL = `${GOOEY_SERVER}/__/file-upload/`;


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
