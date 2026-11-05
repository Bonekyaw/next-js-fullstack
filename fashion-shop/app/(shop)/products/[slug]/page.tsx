import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductBySlug } from "@/lib/products";
import ProductDetailClient from "@/components/products/product-detail-client";
import { productJsonLd, productMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-Id";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
      robots: { index: false, follow: false },
    };
  }

  return productMetadata(product);
}

async function ProductDetailSection({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <ProductDetailClient product={product} />
    </>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Skeleton className="aspect-3/4 w-full rounded-xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

async function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <Button variant="ghost" className="w-fit px-0">
        <Link href="/">← Back to products</Link>
      </Button>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailSection params={params} />
      </Suspense>
    </div>
  );
}

export default ProductPage;
