// import PostClient from "@/components/postClient";
import PostSWR from "@/components/postSWR";

async function PostDetailPage({
  params,
}: {
  params: Promise<{ pid: string }>;
}) {
  const { pid } = await params;
  return (
    <>
      <div>PostDetail</div>
      <PostSWR postId={pid} />
    </>
  );
}

export default PostDetailPage;
