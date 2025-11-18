import Link from "next/link";

async function PostPage() {
  const response = await fetch(process.env.API_URL + "/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts: any[] = await response.json();

  return (
    <>
      <h1>post List page</h1>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title} - {post.views}
          </Link>
        </li>
      ))}
    </>
  );
}

export default PostPage;
