import { Button } from "@/components/ui/button";
import Link from "next/link";
import PostList from "../ui/post-list";

function Page() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl">Post List</h1>
      <Link href="/" className="my-2">
        <Button>Go Home</Button>
      </Link>
      <Link href="/posts/create" className="mb-4">
        Create a new post
      </Link>
      <PostList />
    </div>
  );
}

export default Page;
