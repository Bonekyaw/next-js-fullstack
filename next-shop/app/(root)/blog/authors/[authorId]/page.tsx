// ISR - Incremental Static Regeneration
// Time-based Revalidation
// On-demand Revalidation
export const dynamicParams = false; // if true, it can generate pages on the fly for new params

export const revalidate = 60; // revalidate this page every 1 mins, but is should be more than 1 hours

export async function generateStaticParams() {
  // const authors = await fetch("https://api.example.com/authors").then((res) => res.json());
  // return authors.map((author: { id: string }) => ({
  //   authorId: author.id,
  // }));
  // [{ authorId: '1' }, { authorId: '2' }, ...]
  return [{ authorId: "1" }, { authorId: "2" }, { authorId: "3" }];
}

async function AuthorDetail({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = await params;
  return (
    <div>
      AuthorDetail - {authorId} - {new Date().toLocaleTimeString()}
    </div>
  );
}

export default AuthorDetail;
