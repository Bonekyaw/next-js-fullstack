import { getPost } from "../utils/getPosts";

async function PostDetail({ id }: { id: string }) {
  const post = await getPost(Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      {post.title} - {post.content}
    </div>
  );
}

export default PostDetail;
