// import { Suspense } from "react";
// import Link from "next/link";
import Link from "./ui/link";
import UserList from "./ui/user-list";
import { Button } from "@/components/ui/button";
import { getPosts } from "./utils/getPosts";
import { Suspense } from "react";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl text-black mb-2 bg-amber-300">
        This is a part of the static shell
      </h1>
      <Link href="/posts">
        <Button>Go Post</Button>
      </Link>

      <Suspense fallback={<p>Loading user list...</p>}>
        <UserList />
      </Suspense>
      <UserList />
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
