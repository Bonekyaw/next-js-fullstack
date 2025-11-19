"use client";

import useSWR from "swr";

import api from "@/app/lib/axios";

interface Post {
  id: string;
  title: string;
  author: string;
  views: number;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

function PostSWR({ postId }: { postId: string }) {
  const { data: post, error, isLoading } = useSWR(`/posts/${postId}`, fetcher);

  if (error)
    return (
      <div>Error: {(error as Error).message || "Failed to load post."}</div>
    );
  if (isLoading) return <div>Post Loading...</div>;

  return (
    <div>
      {post.title} - by {post.author} - Views ({post.views})
    </div>
  );
}

export default PostSWR;

// Data Fetching Second Method
// 1. Fetch api
// 2. Axios
// 3. Server State Managment Tools (SWR, RTK query, Tanstack query)
