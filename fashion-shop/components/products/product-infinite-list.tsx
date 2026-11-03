"use client";

import useSWRInfinite from "swr/infinite";
import { preload } from "swr";
import { useCallback, useEffect, useRef } from "react";

import { CategoryValue } from "@/lib/product-utils";
import { ProductListItem, ProductsPageResult } from "@/lib/product-type";
import ProductCardClient from "./product-card-client";
import { productsPageFetcher } from "@/lib/api/load-more-products";
import { Skeleton } from "../ui/skeleton";

type ProductInfiniteListProps = {
  category?: CategoryValue;
  initialItems: ProductListItem[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
};

function buildProductsUrl(category: CategoryValue | undefined, cursor: string) {
  const params = new URLSearchParams({ cursor, limit: "12" });

  if (category) {
    params.set("category", category);
  }
  return `/api/products?${params.toString()}`;
}

function ProductInfinteList({
  category,
  initialItems,
  initialNextCursor,
  initialHasMore,
}: ProductInfiniteListProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);

  const getKey = useCallback(
    (pageIndex: number, previousPageData: ProductsPageResult | null) => {
      if (previousPageData && !previousPageData.hasMore) return null;

      const cursor =
        pageIndex === 0
          ? initialNextCursor
          : (previousPageData?.nextCursor ?? null);
      if (!cursor) return null;

      return buildProductsUrl(category, cursor);
    },
    [category, initialNextCursor],
  );

  const {
    data: extraPages,
    error,
    size,
    setSize,
  } = useSWRInfinite(getKey, productsPageFetcher, {
    initialSize: 0,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    shouldRetryOnError: false,
  });

  // { items: [productA, productB], nextCursor, hasMore }
  const loadedExtraItems = extraPages?.flatMap((page) => page.items) ?? [];
  const items = [...initialItems, ...loadedExtraItems];
  const lastExtraPage = extraPages?.at(-1);
  const hasMore = extraPages?.length
    ? (lastExtraPage?.hasMore ?? false)
    : initialHasMore;
  const isLoadingMore = hasMore && size > (extraPages?.length ?? 0); //

  useEffect(() => {
    if (!initialHasMore || !initialNextCursor) return;

    const nextUrl = buildProductsUrl(category, initialNextCursor);
    preload(nextUrl, productsPageFetcher);
  }, [category, initialNextCursor, initialHasMore]);

  useEffect(() => {
    const nextCursor = lastExtraPage?.nextCursor;
    if (!lastExtraPage?.hasMore || !nextCursor) return;

    const nextUrl = buildProductsUrl(category, nextCursor);
    preload(nextUrl, productsPageFetcher);
  }, [category, lastExtraPage]);

  useEffect(() => {
    if (!isLoadingMore) {
      isLoadingMoreRef.current = false;
    }
  }, [isLoadingMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          isLoadingMoreRef.current = true;
          setSize((size) => size + 1);
        }
      },
      { rootMargin: "600px" },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, error, setSize]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium">No Products Found</p>
        <p className="text-muted-foreground text-sm">
          Try selecting a different category
        </p>
      </div>
    );
  }
  return (
    <div className="gap-g flex flex-col">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCardClient
            key={product.id}
            product={product}
            priority={index < 4}
          />
        ))}
        {isLoadingMore &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              className="bg-muted aspect-3/4 w-full animate-pulse rounded-xl"
            />
          ))}
      </div>
      {error && (
        <div className="w-full text-center text-red-500">
          {error.message || "Failed to load more products"}
        </div>
      )}
      {hasMore && !error && (
        <div ref={sentinelRef} className="h-px w-full shrink-0" aria-hidden />
      )}
    </div>
  );
}

export default ProductInfinteList;
