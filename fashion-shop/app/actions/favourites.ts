"use server";

import z from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { toggleFavoriteSchema } from "@/lib/validations/favourite";
import { revalidateUserFavourites } from "@/lib/cache-tags";

export async function toggleFavouriteAction(input: unknown) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "unauthenticated" };
  }

  const parsed = toggleFavoriteSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { productId } = parsed.data;

  try {
    const existingFavourite = await db.orm.public.ProductToUser.where({
      a: productId,
      b: session.user.id,
    }).first();

    if (existingFavourite) {
      // If the favourite exists, remove it
      await db.orm.public.ProductToUser.where({
        a: productId,
        b: session.user.id,
      }).delete();
      revalidateUserFavourites(session.user.id, true);
      revalidatePath("/", "layout");
      revalidatePath("/products", "layout");
      return { success: true, data: { isFavourite: false } };
    } else {
      // If the favourite does not exist, add it
      await db.orm.public.ProductToUser.create({
        a: productId,
        b: session.user.id,
      });
      revalidateUserFavourites(session.user.id, true);
      revalidatePath("/", "layout");
      revalidatePath("/products", "layout");
      return { success: true, data: { isFavourite: true } };
    }
  } catch (error) {
    // console.error("Error toggling favourite:", error);
    return { success: false, error: "Failed to toggle favourite" };
  }
}
