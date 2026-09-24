"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type RegisterInput, registerSchema } from "@/lib/validations/auth";
import { signUp, emailOtp } from "@/lib/auth-client";
import { registerUser } from "@/app/actions/auth";
import AuthFormPanel from "./auth-form-panel";
import Link from "next/link";
import GoogleSignInButton from "./google-sign-in-button";

export default function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RegisterInput) {
    startTransition(async () => {
      const result = await registerUser(data);

      if (!result.success) {
        if (result.code === "ACCOUNT_FROZEN") {
          router.push("/login/frozen");
          return;
        }

        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              form.setError(field as keyof RegisterInput, {
                message: errors.join(", "),
              });
            }
          });
        }

        if (result.error) {
          form.setError("root", { message: result.error });
        }

        return;
      }

      const verifyOtpUrl = new URL("/verify-otp", window.location.origin);
      verifyOtpUrl.searchParams.set("email", result.data!.email);
      verifyOtpUrl.searchParams.set("flow", "register");
      if (result.data?.resumed) {
        verifyOtpUrl.searchParams.set("resumed", "true");
      }

      router.push(verifyOtpUrl.toString());
    });
  }

  return (
    <AuthFormPanel
      title="Create your account"
      description="Join Fashion Shop to save favorites, track orders, and shop curated collections."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <GoogleSignInButton />
      <Marker variant="separator">
        <MarkerContent className="text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase">
          or continue with email
        </MarkerContent>
      </Marker>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Alex Rivera"
                  className="h-11 rounded-xl"
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create password"
                    className="h-11 rounded-xl"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">Confirm</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    className="h-11 rounded-xl"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
          {form.formState.errors.root && (
            <FieldError>{form.formState.errors.root.message}</FieldError>
          )}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl"
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </FieldGroup>
      </form>
    </AuthFormPanel>
  );
}
