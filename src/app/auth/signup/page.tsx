"use client";

import { toast } from "sonner";
import { AuthForm } from "../_components/AuthForm";

export default function SignUp() {
  return (
    <AuthForm
      type="signup"
      onSubmit={async () => {
        toast.success("Form submitted successfully");
      }}
    />
  );
}
