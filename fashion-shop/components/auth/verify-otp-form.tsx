"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { OtpInput, otpSchema } from "@/lib/validations/auth";
import { sanitizeCallbackUrl } from "@/lib/auth/safe-redirect";
import AuthFormPanel from "./auth-form-panel";
import { completeRegistrationVerification } from "@/app/actions/auth";

function VerifyOtpFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const flow = searchParams.get("flow") ?? "";
  const resumed = searchParams.get("resumed") === "true";
  const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));
  const [isPending, startTransition] = useTransition();

  const form = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  function onSubmit(data: OtpInput) {
    startTransition(async () => {
      if (flow === "login") {
        // Handle login flow
        return;
      } else {
        // Handle registration flow
        const result = await completeRegistrationVerification(data);
        if (!result.success) {
          if (result.fieldErrors) {
            Object.entries(result.fieldErrors).forEach(([field, errors]) => {
              if (errors && errors.length > 0) {
                form.setError(field as keyof OtpInput, {
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
      }
      router.push(callbackUrl);
      router.refresh();
    });
  }

  function handleResendCode() {
    startTransition(async () => {
      return;
    });
  }

  return (
    <AuthFormPanel
      title="Check your email"
      description={`Please enter the 6-digit code sent to : ${email}.`}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="otp">Verification Code</FieldLabel>
                <FieldDescription>
                  Codes expire quickly for your security.
                </FieldDescription>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  pattern={REGEXP_ONLY_DIGITS}
                  containerClassName="justify-center sm:justify-start gap-2 my-8"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="size-11" />
                    <InputOTPSlot index={1} className="size-11" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} className="size-11" />
                    <InputOTPSlot index={3} className="size-11" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} className="size-11" />
                    <InputOTPSlot index={5} className="size-11" />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          {form.formState.errors.root && (
            <FieldError>{form.formState.errors.root?.message}</FieldError>
          )}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl sm:w-auto"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-11 w-full rounded-xl sm:w-auto"
            disabled={isPending}
            onClick={handleResendCode}
          >
            {isPending ? "Resending..." : "Resend code"}
          </Button>
        </FieldGroup>
      </form>
    </AuthFormPanel>
  );
}

export default function VerifyOtpForm() {
  return (
    <Suspense>
      <VerifyOtpFormInner />
    </Suspense>
  );
}
