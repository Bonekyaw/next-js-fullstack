import { Suspense } from "react";

import CategoryFilter from "@/components/products/category-filter";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";
import { CategoryValue } from "@/lib/product-utils";
import ProductGrid from "@/components/products/product-grid";

type ProductGridSectionProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

async function ProductGridSection({ searchParams }: ProductGridSectionProps) {
  const { category } = await searchParams;
  const validCategories = ["MEN", "WOMEN", "TEENS", "CHILD", "KIDS"] as const;
  const selecetedCategory = validCategories.includes(category as CategoryValue)
    ? (category as CategoryValue)
    : undefined;

  return <ProductGrid category={selecetedCategory} />;
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Shop Collection</h1>
        <p className="text-muted-foreground">
          Browse our latest fashion for Men, Women, Teens, Child, and Kids
        </p>
      </div>
      <CategoryFilter />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGridSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
