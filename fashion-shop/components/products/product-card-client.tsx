"use client";

import { ProductListItem } from "@/lib/product-type";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatPrice, getCategoryLabel } from "@/lib/product-utils";

type ProductCardClientProps = {
  product: ProductListItem;
  priority?: boolean;
};
function ProductCardClient({
  product,
  priority = false,
}: ProductCardClientProps) {
  const sizes = [...new Set(product.productVariants.map((v) => v.size))];
  const colors = [...new Set(product.productVariants.map((v) => v.color))];

  return (
    <Card className="overflow-hidden pt-0">
      <CardHeader className="relative p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="bg-muted relative aspect-3/4 overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-medium hover:underline"
          >
            {product.name}
          </Link>
          <Badge variant="secondary">
            {getCategoryLabel(product.category)}
          </Badge>
        </div>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1 px-4 pb-4">
        {sizes.map((s) => (
          <Badge key={s} variant="outline">
            {s}
          </Badge>
        ))}
        {colors.map((c) => (
          <Badge key={c} variant="outline">
            {c}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}

export default ProductCardClient;
