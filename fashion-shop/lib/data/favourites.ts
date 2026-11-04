import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/prisma";
import { CACHE_TAGS } from "../cache-tags";

export async function getUserFavouriteIds(userId: string) {
  "use cache";
  cacheTag(CACHE_TAGS.favourites(userId));
  cacheLife("minutes");

  const favourites = await db.orm.public.ProductToUser.select("a")
    .where({ b: userId })
    .all();

  return favourites.map((favourite) => favourite.a); // a = productId, b = userId
}
