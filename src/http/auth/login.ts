import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setAuthToken } from "@/lib/auth-token";
import { api } from "../api";
import type { AuthTokensResponse } from "./types";

export interface LoginParams {
  email: string;
  password: string;
}

function formatMutationError(err: unknown): string {
  if (isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined;
    return data?.message ?? err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something went wrong";
}

const loginFn = async (data: LoginParams) => {
  const res = await api.post<AuthTokensResponse>("/auth/login", {
    email: data.email,
    password: data.password,
  });
  return res.data;
};

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginParams) => loginFn(data),
    onSuccess: (data) => {
      setAuthToken(data.accessToken);
      toast.success("Logged in successfully!");
      router.replace("/");
    },
    onError: (err: unknown) => {
      toast.error(`Login failed: ${formatMutationError(err)}`);
    },
  });
}
