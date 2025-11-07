"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export async function refreshPostsCache() {
  // revalidateTag("posts", "max"); // tag-based approach
  revalidatePath("/blog"); // path-based approach
}
