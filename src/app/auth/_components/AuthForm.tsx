"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type AuthFormValues = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.email("Must be a valid email"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export function AuthForm({
  type,
  onSubmit,
}: {
  type: "login" | "signup";
  onSubmit: SubmitHandler<AuthFormValues>;
}) {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  const emailInvalid =
    !!errors.email && Boolean(touchedFields.email || isSubmitted);
  const passwordInvalid =
    !!errors.password && Boolean(touchedFields.password || isSubmitted);

  const wordToUse = type === "login" ? "Log in" : "Sign Up";

  return (
    <section className="w-full px-8 pt-12 pb-8 md:px-16" data-auth-mode={type}>
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/auth/login"
          className={cn(
            "mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-700",
            type === "login" && "hidden",
          )}
        >
          <ChevronLeft className="size-4" />
          Back
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {wordToUse}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {wordToUse} to Code&Care Dashboard to overview your project.
        </p>

        <form
          id="login-form"
          className="mt-10"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup className="space-y-2">
            <Field data-invalid={emailInvalid}>
              <FieldLabel
                htmlFor="email"
                className="mb-2 block text-1xl font-medium text-slate-700"
              >
                Email address <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="email"
                aria-invalid={emailInvalid}
                placeholder="Enter email address"
                autoComplete="email"
                className="h-12"
                {...register("email")}
              />
              {emailInvalid && errors.email && (
                <FieldError className="mt-2" errors={[errors.email]} />
              )}
            </Field>

            <Field data-invalid={passwordInvalid}>
              <FieldLabel
                htmlFor="password"
                className="mb-2 block text-1xl font-medium text-slate-700"
              >
                Password <span className="text-red-500">*</span>
              </FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={passwordInvalid}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="h-12 pr-12"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex w-14 items-center justify-center cursor-pointer text-slate-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {passwordInvalid && errors.password && (
                    <FieldError className="mt-2" errors={[errors.password]} />
                  )}
                </div>

                <div className="mt-2 text-right">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="mt-8 h-12 w-full  bg-[#1B2BFF] cursor-pointer text-1xl font-semibold text-white hover:bg-[#1522d0]"
          >
            {type === "login" ? "Continue" : "Register"}
          </Button>
        </form>

        {type === "login" && (
          <div className="mt-8 flex flex-col items-stretch gap-3 border-t border-slate-200 pt-8">
            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?
            </p>
            <Link
              href="/auth/signup"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 w-full justify-center text-base font-semibold text-slate-900",
              )}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
