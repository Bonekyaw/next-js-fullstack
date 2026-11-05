import type { MetadataRoute } from "next";
import { db } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/product-utils";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await db.orm.public.Product.select(
    "slug",
    "updatedAt",
    "createdAt",
  )
    .where({ isActive: true })
    .orderBy((product) => product.updatedAt.desc())
    .all();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...CATEGORIES.map((category) => ({
      url: absoluteUrl(`/?category=${category.value}`),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: new Date(
      String(product.updatedAt ?? product.createdAt ?? Date.now()),
    ),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
