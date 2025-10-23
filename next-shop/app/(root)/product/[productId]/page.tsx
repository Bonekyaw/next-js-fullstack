// async function ProductDetail({
//   params,
// }: {
//   params: Promise<{ productId: string }>;

// }) {
// "use client";

import { notFound } from "next/navigation";
// import { use } from "react";

async function ProductDetail(props: PageProps<"/product/[productId]">) {
  const { productId } = await props.params;
  // const { productId } = use(props.params);
  // const { productId } = useParams<{ productId: string }>();

  // Just testing
  if (parseInt(productId) > 100) {
    notFound();
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <>
      <div>ProductDetail - {productId}</div>
    </>
  );
}

export default ProductDetail;
