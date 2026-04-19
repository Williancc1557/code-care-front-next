"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AuthForm, type AuthFormValues } from "../_components/AuthForm";

const formSchema = z.object({
  email: z.email("Must be a valid email"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export default function Login() {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  return (
    <AuthForm
      form={form}
      type="login"
      onSubmit={async () => {
        toast.success("Form submitted successfully");
      }}
    />
  );
}
