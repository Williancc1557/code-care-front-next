"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully");
    },
  });

  return (
    <section className="w-full px-20 mt-10">
      <span>Log in</span>
      <p>Log In to Code&Care Dashboard to overview your project.</p>

      <form
        id="bug-report-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
          console.log("hi");
        }}
      >
        <FieldGroup>
          <form.Field
            name="email"
            // biome-ignore lint/correctness/noChildrenProp: <explanation>
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Provide a concise title for your bug report.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="password"
            // biome-ignore lint/correctness/noChildrenProp: <explanation>
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Provide a concise title for your bug report.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}
