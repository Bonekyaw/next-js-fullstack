import { Suspense } from "react";
import UserList from "./ui/user-list";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl text-black mb-2 bg-amber-300">
        This is a part of the static shell
      </h1>
      <Suspense fallback={<p>Loading user list...</p>}>
        <UserList />
      </Suspense>
    </div>
  );
}
