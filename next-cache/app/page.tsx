// import { Suspense } from "react";
import Posts from "./ui/posts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl text-black mb-2 bg-amber-300">
        This is a part of the static shell
      </h1>
      <Posts />
      {/* <Suspense fallback={<h2 className="text-lg">Loading latest posts...</h2>}>
        <Posts />
      </Suspense> */}
    </div>
  );
}
