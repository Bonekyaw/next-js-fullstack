"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export type State = {
  errors?: {
    title?: string[];
    content?: string[];
    published?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title is invalid!")
    .max(100, "Title is too long!"),
  content: z.string().trim().min(10, "Content is invalid!"),
  published: z
    .string()
    .nullable()
    .transform((val) => val === "on"),
});

export async function createPostAction(
  authorId: number,
  prevState: State,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    published: formData.get("published"),
  });

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      errors: flattened.fieldErrors,
      message: "Failed to create a new post",
    };
  }

  const { title, content, published } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
  } catch {
    return {
      message: "Database Error: Failed to create a new post",
    };
  }

  // revalidatePath("/posts");
  // revalidateTag("posts", "max");
  updateTag("posts");
  redirect("/posts");
}

// revalidatePath - revalidating specific pages or layout

// revalidateTag - revalidating data in server action and route handler
// updateTag - revalidating data in server action only

// cacheTag
