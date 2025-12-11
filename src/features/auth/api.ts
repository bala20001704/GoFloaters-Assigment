import axiosInstance, { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/services/api/axios";
import type { LoginResponse, Users } from "./types";
import { authStorage } from "./utils";

interface LoginData {
  username: string;
  password: string;
}

export const login = async (variables: LoginData): Promise<LoginResponse> => {
  const { username, password } = variables;
  const res = await axiosInstance.post("/auth/login", {
    username,
    password,
  });

  const { accessToken, refreshToken, ...userData } = res.data;
  authStorage.setToken(ACCESS_TOKEN_KEY, accessToken);
  authStorage.setToken(REFRESH_TOKEN_KEY, refreshToken);
  return {
    accessToken,
    refreshToken,
    user: userData,
  };
};

export const getAuthUser = async (): Promise<Users | null> => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    return null;
  }
};
