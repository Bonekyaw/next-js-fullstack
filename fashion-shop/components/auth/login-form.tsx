"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { sanitizeCallbackUrl } from "@/lib/auth/safe-redirect";
import AuthFormPanel from "@/components/auth/auth-form-panel";
import GoogleSignInButton from "@/components/auth/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginInput) {
    startTransition(async () => {
      // Validate login credentials
    });
  }

  return (
    <AuthFormPanel
      title="Welcome back"
      description="Sign in to access your saved favorites, cart, and order history."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            Create one
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11 rounded-xl"
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          {form.formState.errors.root && (
            <FieldError>{form.formState.errors.root.message}</FieldError>
          )}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Continue to verification"}
          </Button>
        </FieldGroup>
      </form>
    </AuthFormPanel>
  );
}

export default function LoginForm() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}
