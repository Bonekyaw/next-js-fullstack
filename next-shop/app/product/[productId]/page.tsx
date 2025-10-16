// async function ProductDetail({
//   params,
// }: {
//   params: Promise<{ productId: string }>;

// }) {
"use client";

import { useParams } from "next/navigation";
// import { use } from "react";

// function ProductDetail(props: PageProps<"/product/[productId]">) {
function ProductDetail() {
  // const { productId } = await props.params;
  // const { productId } = use(props.params);
  const { productId } = useParams<{ productId: string }>();

  return (
    <>
      <div>ProductDetail - {productId}</div>
    </>
  );
}

export default ProductDetail;
