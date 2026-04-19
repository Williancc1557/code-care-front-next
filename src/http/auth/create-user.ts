import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { api } from "../api";

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
  const res = await api.post("/auth/register", {
    email: data.email,
    password: data.password,
  });
  return res;
};

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUserParams) => createUserFn(data),
    onSuccess: () => {
      toast.success("User registered successfuly!");
    },
    onError: (err: unknown) => {
      toast.error(`Error while creating user: ${formatMutationError(err)}`);
    },
  });
}
