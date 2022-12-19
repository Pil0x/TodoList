import axios from "axios";

const getBaseUrl = () => {
  return "https://localhost:13601/api/";
};

const getBaseWebAppUrl = () => {
  return "https://localhost:13600/api/";
};

const BASE_API_URL = getBaseUrl();
const BASE_WEB_APP_URL = getBaseWebAppUrl();

export const axiosWebAPi = axios.create({
  baseURL: BASE_API_URL,
});

export const axiosWebApp = axios.create({
  baseURL: BASE_WEB_APP_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
});

const authHeader = (token: string) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export const privateWebApi = (token: string) => {
  return axios.create({
    baseURL: BASE_API_URL,
    ...authHeader(token),
  });
};
