"use client";

import { useForm } from "@tanstack/react-form";
import { ChevronLeft, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.email("Must be a valid email"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async () => {
      toast.success("Form submitted successfully");
    },
  });

  return (
    <section className="w-full px-8 pt-12 pb-8 md:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          <ChevronLeft className="size-4" />
          Back
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Log in
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Log In to Code&Care Dashboard to overview your project.
        </p>

        <form
          id="login-form"
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-2">
            <form.Field
              name="email"
              // biome-ignore lint/correctness/noChildrenProp: TanStack Form uses render prop in children
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="mb-2 block text-1xl font-medium text-slate-700"
                    >
                      Email address <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter email address"
                      autoComplete="email"
                      className="h-12"
                    />
                    {isInvalid && (
                      <FieldError
                        className="mt-2"
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              // biome-ignore lint/correctness/noChildrenProp: TanStack Form uses render prop in children
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="mb-2 block text-1xl font-medium text-slate-700"
                    >
                      Password <span className="text-red-500">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Password"
                        autoComplete="current-password"
                        className="h-12"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500"
                        aria-label="Toggle password visibility"
                      >
                        <Eye className="size-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {isInvalid && (
                          <FieldError
                            className="mt-2"
                            errors={field.state.meta.errors}
                          />
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
                );
              }}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="mt-8 h-12 w-full  bg-[#1B2BFF] cursor-pointer text-1xl font-semibold text-white hover:bg-[#1522d0]"
          >
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
}
