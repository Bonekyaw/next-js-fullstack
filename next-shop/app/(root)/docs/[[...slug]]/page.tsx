// Catch-All Route
import React from "react";

async function Docs({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return (
    <>
      <h1>Docs page</h1>
      {slug?.length >= 2 ? (
        <p>
          Title - {slug[0]} & SubTitle - {slug[1]}
        </p>
      ) : (
        slug?.length === 1 && <p>Title - {slug[0]}</p>
      )}
    </>
  );
}

export default Docs;
