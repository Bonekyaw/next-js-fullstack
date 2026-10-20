export const CACHE_TAGS = {
  products: "products",
  product: (slug: string) => `product-${slug}`,
} as const;
