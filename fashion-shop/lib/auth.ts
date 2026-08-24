import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "./email";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  // trustedOrigins: ["http://localhost:5173"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account", // Always prompt to select account
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
  // session: {
  //       cookieCache: {
  //           enabled: true,
  //           maxAge: 5 * 60, // 5 minutes
  //       }
  //   },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const subjects: Record<string, string> = {
          "email-verification": "Verify Your Email",
          forget_password: "Reset Your Password",
        };
        await sendEmail({
          to: email,
          subject: subjects[type],
          html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
        });
      },
    }),
    nextCookies(),
  ], // make sure this is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
