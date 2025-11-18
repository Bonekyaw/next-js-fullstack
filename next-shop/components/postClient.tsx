"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";

interface Post {
  id: string;
  title: string;
  author: string;
  views: number;
}

function PostClient({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Call API & setPost
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // const res = await fetch(
        //   process.env.NEXT_PUBLIC_API_URL + `/posts/${postId}`,
        // );

        // if (!res.ok) {
        //   throw new Error(`Request failed with status ${res.status}`);
        // }
        // const data = await res.json();
        const res = await api.get(`/posts/${postId}`);
        if (res.status !== 200) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        setPost(res.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Post Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {post?.title} - by {post?.author} - Views ({post?.views})
    </div>
  );
}

export default PostClient;

// Data Fetching Second Method
// 1. Fetch api
// 2. Axios
// 3. Server State Managment Tools (SWR, RTK query, Tanstack query)
