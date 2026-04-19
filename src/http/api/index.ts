import axios from "axios";
import { env } from "@/config/env";
import { getAuthToken } from "@/lib/auth-token";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
