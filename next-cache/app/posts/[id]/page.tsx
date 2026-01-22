import { getPost, getPosts } from "@/app/utils/getPosts";

export async function generateStaticParams() {
  const posts = await getPosts(); // Must Get Latest 10 posts Only
  return posts.map((post) => ({
    id: post.id.toString(),
  })); // [{id: '1'}, {id: '2'}  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: {
      absolute: post.title,
    },
    description: post.content?.slice(0, 160) || "Blog post detail page",
  };
}

async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetailPage;
