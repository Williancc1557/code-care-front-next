"use client";

import { useCreateUser } from "@/http/auth/create-user";
import { AuthForm } from "../_components/AuthForm";

export default function SignUp() {
  const { mutate } = useCreateUser();

  return (
    <AuthForm
      type="signup"
      onSubmit={(data) => {
        mutate({
          email: data.email,
          password: data.password,
        });
      }}
    />
  );
}
