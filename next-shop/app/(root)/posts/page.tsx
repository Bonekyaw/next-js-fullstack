import PostHybrid from "@/components/postHybrid";

async function PostPage() {
  const response = await fetch(process.env.API_URL + "/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts: any[] = await response.json();

  return (
    <>
      <h1>post List page</h1>
      <PostHybrid initialData={posts} />
    </>
  );
}

export default PostPage;
