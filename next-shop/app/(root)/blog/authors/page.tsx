import UserList from "@/components/userList";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";

async function getUsers() {
  return prisma.user.findMany();
}

async function Authors() {
  const users = getUsers();

  return (
    <>
      <h1 className="text-3xl">Authors</h1>
      <Suspense fallback={<div>User List loading...</div>}>
        <UserList users={users} />
      </Suspense>
    </>
  );
}

export default Authors;
