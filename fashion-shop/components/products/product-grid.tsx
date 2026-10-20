import { CategoryValue } from "@/lib/product-utils";

type ProductGridProps = {
  category?: CategoryValue;
};

async function ProductGrid({ category }: ProductGridProps) {
  // Fetch products from server side
  // const page = await getProductPage( category, undefined , 12);

  return <div>ProductGrid via Server + Client products</div>;
}

export default ProductGrid;
