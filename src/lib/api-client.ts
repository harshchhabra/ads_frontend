import Axios from "axios";

const axios: any = Axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

axios.interceptors.request.use((config: any) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default async function API(
  method = "get",
  url = "",
  data = {},
  isFileUpload = false
) {
  try {
    const headers = {
      "Content-Type": isFileUpload ? "multipart/form-data" : "application/json",
    };
    const response = await axios[method](`/api/${url}`, data, {
      headers,
    });
    if (!response) {
      throw false;
    }
    return await response;
  } catch (error: any) {
    throw error.response;
  }
}
