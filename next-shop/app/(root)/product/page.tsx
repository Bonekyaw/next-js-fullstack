// "use client";

// import { useSearchParams } from "next/navigation";

// import { use } from "react";

async function ProductList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", category = "", query = "" } = await searchParams;
  // const { page = "1", category = "", query = "" } = use(searchParams);
  // const searchParams = useSearchParams();
  // const page = searchParams.get("page") || "1";
  // const category = searchParams.get("category");
  // const query = searchParams.get("query");

  return (
    <div>
      <h1>ProductList - {new Date().toLocaleTimeString()}</h1>
      <p>Current Page: {page}</p>
      <p>Category: {category}</p>
      <p>Query: {query}</p>
    </div>
  );
}

export default ProductList;
