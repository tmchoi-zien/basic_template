import axios, { AxiosInstance } from "axios";
import { getTokens } from "@/utils/authHelper";

export const AuthAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // 기본 URL 설정
  });

  instance.interceptors.request.use(
    (config) => {
      const { accessToken, refreshToken } = getTokens(); // getTokens로 accessToken과 refreshToken 가져오기

      if (accessToken) {
        config.headers["Ac_token"] = `${accessToken}`;
        // config.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (refreshToken) {
        config.headers["Re_token"] = refreshToken;
        // config.headers["X-Refresh-Token"] = refreshToken;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};
