"use client";

import { useLogin } from "@/http/auth/login";
import { AuthForm } from "../_components/AuthForm";

export default function Login() {
  const { mutate } = useLogin();

  return (
    <AuthForm
      type="login"
      onSubmit={(data) => {
        mutate({
          email: data.email,
          password: data.password,
        });
      }}
    />
  );
}
