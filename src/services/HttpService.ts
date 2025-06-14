import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("HTTP Error", error);
    return Promise.reject(error);
  }
);

export default instance;
