import prisma from "@/lib/prisma";
import { cacheLife } from "next/cache";
// import { connection } from "next/server";

async function UserList() {
  // await connection();
  "use cache";
  cacheLife({ stale: 120, revalidate: 180 });

  const users = await prisma.user.findMany();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="mb-2">
          <p className="text-sm">
            {user.name} - {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
