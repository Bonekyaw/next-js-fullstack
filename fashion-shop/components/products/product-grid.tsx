import { getProductPage } from "@/lib/data/products";
import { CategoryValue } from "@/lib/product-utils";
import ProductInfinteList from "./product-infinite-list";

type ProductGridProps = {
  category?: CategoryValue;
};

async function ProductGrid({ category }: ProductGridProps) {
  // Fetch products from server side
  const page = await getProductPage(category, undefined, 12);

  return (
    <ProductInfinteList
      key={category ?? "ALL"}
      category={category}
      initialItems={page.items}
      initialNextCursor={page.nextCursor}
      initialHasMore={page.hasMore}
    />
  );
}

export default ProductGrid;
