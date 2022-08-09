import axios from "axios";

const instance = axios.create({
  baseURL: "https://planning-api-express.herokuapp.com/api/",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("/auth/login") && !config.url?.includes("/auth/register") && config.headers)
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;