import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .regex(
        /^(?=.*[a-zA-Z])[a-zA-Z.]+(?: [a-zA-Z.]+)*$/,
        "Name must contain only letters and spaces",
      ),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be 8 characters")
      .max(8, "Password must be 8 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
