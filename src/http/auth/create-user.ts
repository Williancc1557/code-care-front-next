import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setAuthToken } from "@/lib/auth-token";
import { api } from "../api";
import type { AuthTokensResponse } from "./types";

export interface CreateUserParams {
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

const createUserFn = async (data: CreateUserParams) => {
  const res = await api.post<AuthTokensResponse>("/auth/register", {
    email: data.email,
    password: data.password,
  });
  return res.data;
};

export function useCreateUser() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: CreateUserParams) => createUserFn(data),
    onSuccess: (data) => {
      setAuthToken(data.accessToken);
      toast.success("User registered successfuly!");
      router.replace("/");
    },
    onError: (err: unknown) => {
      toast.error(`Error while creating user: ${formatMutationError(err)}`);
    },
  });
}
