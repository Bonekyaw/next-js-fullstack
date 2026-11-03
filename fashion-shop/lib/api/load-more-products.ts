import { ProductsPageResult } from "../product-type";
import { ActionResponse } from "../types";
import { authFetch } from "./auth-fetch";

export async function productsPageFetcher(
  url: string,
): Promise<ProductsPageResult> {
  const res = await authFetch(url);
  const body = (await res.json()) as ActionResponse<ProductsPageResult>;
  if (!res.ok || !body.success || !body.data) {
    throw new Error(body.error || "Failed to load more products");
  }
  return body.data;
}
