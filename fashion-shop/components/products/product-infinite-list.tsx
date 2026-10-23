"use client";

import { CategoryValue } from "@/lib/product-utils";
import { ProductListItem } from "@/lib/product-type";
import ProductCardClient from "./product-card-client";

type ProductInfiniteListProps = {
  category?: CategoryValue;
  initialItems: ProductListItem[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
};

function ProductInfinteList({
  category,
  initialItems,
  initialNextCursor,
  initialHasMore,
}: ProductInfiniteListProps) {
  if (initialItems.length === 0) {
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
        {initialItems.map((product, index) => (
          <ProductCardClient
            key={product.id}
            product={product}
            priority={index < 4}
          />
        ))}
      </div>
      {initialHasMore && <div className="w-full text-4xl">Has More Pages</div>}
    </div>
  );
}

export default ProductInfinteList;
