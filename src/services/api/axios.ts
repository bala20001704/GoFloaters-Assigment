import axios from "axios";
import { authStorage } from "@/features/auth/utils";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = authStorage.getAccessToken();

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const refreshToken = authStorage.getRefreshToken();

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post("https://dummyjson.com/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.token;

        authStorage.setAccessToken(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        authStorage.clear();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
