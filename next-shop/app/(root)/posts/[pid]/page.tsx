// import PostClient from "@/components/postClient";
// import PostSWR from "@/components/postSWR";

import { Suspense } from "react";

interface Post {
  id: number;
  title: string;
  authorId: string;
  views: number;
}

interface Author {
  id: string;
  name: string;
  email: string;
}

async function getPost(postId: string): Promise<Post> {
  return await fetch(process.env.API_URL + `/posts/${postId}`).then((res) =>
    res.json(),
  );
}

async function getAuthor(authorId: string): Promise<Author> {
  return await fetch(process.env.API_URL + `/users/${authorId}`).then((res) =>
    res.json(),
  );
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ pid: string }>;
}) {
  const { pid } = await params;
  const post = await getPost(pid);

  return (
    <>
      <div>PostDetail</div>
      <p>
        {post.title} - views({post.views})
      </p>
      <Suspense
        fallback={<p className="font-bold text-green-400">Loading author...</p>}
      >
        <Author authorId={post.authorId} />
      </Suspense>
      {/* <PostSWR postId={pid} /> */}
    </>
  );
}

async function Author({ authorId }: { authorId: string }) {
  const author = await getAuthor(authorId);
  return (
    <p>
      Author: {author.name} ({author.email})
    </p>
  );
}
