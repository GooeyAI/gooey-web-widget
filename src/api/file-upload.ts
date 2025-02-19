import axios from "axios";

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
