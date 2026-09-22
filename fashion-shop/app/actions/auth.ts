"use server";

import z from "zod";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

import { RegisterInput, registerSchema } from "@/lib/validations/auth";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ErrorCodes } from "@/lib/error_code";
import { isAdminRole } from "@/lib/auth/role";
import { upsertPendingRegistration } from "@/lib/auth/pending-registration";

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
      error: ErrorCodes.ACCOUNT_FROZEN.message,
      code: ErrorCodes.ACCOUNT_FROZEN.code,
    };
  }

  if (existingUser && isAdminRole(existingUser.role)) {
    return {
      success: false,
      error: ErrorCodes.ADMIN_ACCOUNT.message,
      code: ErrorCodes.ADMIN_ACCOUNT.code,
    };
  }

  if (existingUser && existingUser?.emailVerified) {
    return {
      success: false,
      error: ErrorCodes.EMAIL_ALREADY_EXISTS.message,
      code: ErrorCodes.EMAIL_ALREADY_EXISTS.code,
    };
  }

  if (existingUser && !existingUser?.emailVerified) {
    try {
      await upsertPendingRegistration(normalizedEmail, name, password);
      await auth.api.sendVerificationOTP({
        body: {
          email: normalizedEmail,
          type: "email-verification",
        },
        headers: await headers(),
      });
    } catch {
      return {
        success: false,
        error: "Failed to create pending registration. Please try again later.",
      };
    }
    return {
      success: true,
      data: { email: normalizedEmail, resumed: true },
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
