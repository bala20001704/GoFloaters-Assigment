import axios from "axios";
import { authStorage } from "@/features/auth/utils";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = authStorage.getToken(ACCESS_TOKEN_KEY);

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const refreshToken = authStorage.getToken(REFRESH_TOKEN_KEY);

    if (error.response?.status === 401 && refreshToken && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        const res = await axios.post("https://dummyjson.com/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.token;

        authStorage.setToken(ACCESS_TOKEN_KEY, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        authStorage.clear(ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY);
        return Promise.reject((err: Error) => console.log("axios response error", err));
      }
    }
    return Promise.reject((error: Error) => console.log("axios response error", error));
  }
);

export default axiosInstance;
