import { revalidateTag, updateTag } from "next/cache";

export const CACHE_TAGS = {
  products: "products",
  product: (slug: string) => `product-${slug}`,
  favourites: (userId: string) => `favourites-${userId}`,
  orders: (userId: string) => `orders-${userId}`,
} as const;

function invalidateCacheTag(tag: string, immediate = false) {
  if (immediate) {
    updateTag(tag);
    return;
  }
  revalidateTag(tag, "max");
}

export function revalidateUserFavourites(userId: string, immediate = false) {
  invalidateCacheTag(CACHE_TAGS.favourites(userId), immediate);
}
