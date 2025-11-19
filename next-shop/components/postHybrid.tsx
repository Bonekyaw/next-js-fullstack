"use client";

import Link from "next/link";
import useSWR from "swr";

import api from "@/app/lib/axios";

interface Post {
  id: string;
  title: string;
  author: string;
  views: number;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

function PostHybrid({ initialData }: { initialData: Post[] }) {
  const {
    data: posts,
    error,
    // isLoading,
  } = useSWR(`/posts`, fetcher, {
    fallbackData: initialData,
    revalidateOnMount: true,
  });

  if (error)
    return (
      <div>Error: {(error as Error).message || "Failed to load post."}</div>
    );
  //   if (isLoading) return <div>Post Loading...</div>;

  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title} - {post.views}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostHybrid;
