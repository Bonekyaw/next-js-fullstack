import prisma from "@/lib/prisma";
import { connection } from "next/server";

async function UserList() {
  await connection();

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
