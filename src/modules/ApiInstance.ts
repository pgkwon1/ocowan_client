import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  validateStatus: (status) => {
    if (status === 401) {
      Promise.reject(401);
      return false;
    }
    return true;
  },
});

api.interceptors.request.use((request) => {
  if (request.url !== "/github/login") {
    const token = Cookies.get("token");
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
