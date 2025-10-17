// async function ProductDetailLayout({
//   children,
//   params,
// }: Readonly<{
//   children: React.ReactNode;
//   params: Promise<{ productId: string }>;
// }>) {
async function ProductDetailLayout(props: LayoutProps<"/product/[productId]">) {
  //   const { productId } = await params;
  const { productId } = await props.params;
  return (
    <>
      <h1>Product Detail Header - {productId}</h1>
      {props.children}
    </>
  );
}

export default ProductDetailLayout;
