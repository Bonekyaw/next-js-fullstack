import { cacheLife, cacheTag } from "next/cache";

import { CategoryValue } from "../product-utils";
import { CACHE_TAGS } from "../cache-tags";
import { queryProductsPage } from "../queries/product-page";

export async function getProductPage(
  category: CategoryValue | undefined,
  cursor: string | undefined,
  limit: number,
) {
  "use cache";
  cacheTag(CACHE_TAGS.products);
  cacheLife("hours");

  return queryProductsPage(category, cursor, limit);
}
