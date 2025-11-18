import PostClient from "@/components/postClient";

async function PostDetailPage({
  params,
}: {
  params: Promise<{ pid: string }>;
}) {
  const { pid } = await params;
  return (
    <>
      <div>PostDetail</div>
      <PostClient postId={pid} />
    </>
  );
}

export default PostDetailPage;
