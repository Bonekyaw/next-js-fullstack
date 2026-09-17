"use server";

import z from "zod";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

import { RegisterInput, registerSchema } from "@/lib/validations/auth";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await db.orm.public.User.select(
    "id",
    "emailVerified",
    "role",
    "isFrozen",
  )
    .where({ email: normalizedEmail })
    .first();

  if (existingUser && existingUser?.isFrozen) {
    return {
      success: false,
      error:
        "This account has been frozen. Please contact support for assistance.",
      code: "ACCOUNT_FROZEN",
    };
  }

  if (existingUser && existingUser?.role === "ADMIN") {
    return {
      success: false,
      error: "Admin accounts must sign in through the admin portal.",
      code: "ADMIN_ACCOUNT",
    };
  }

  if (existingUser && existingUser?.emailVerified) {
    return {
      success: false,
      error:
        "An account with this email already exists. Please sign in instead.",
      code: "EMAIL_ALREADY_EXISTS",
    };
  }

  if (existingUser && !existingUser?.emailVerified) {
    // We will fix the current issue
    return {
      success: false,
      error:
        "An account with this email already exists but is not verified. Please check your email for the verification link or request a new one.",
      code: "EMAIL_NOT_VERIFIED",
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email: normalizedEmail,
        password,
      },
      headers: await headers(),
    });
  } catch (error) {
    const message =
      error instanceof APIError
        ? error.message
        : "Failed to create account. Please try again later.";
    return { success: false, error: message };
  }

  try {
    await auth.api.sendVerificationOTP({
      body: {
        email: normalizedEmail,
        type: "email-verification",
      },
      headers: await headers(),
    });
  } catch (error) {
    const message =
      error instanceof APIError
        ? error.message
        : "Failed to send verification email. Please try again later.";
    return { success: false, error: message };
  }

  return { success: true, data: { email: normalizedEmail } };
}
