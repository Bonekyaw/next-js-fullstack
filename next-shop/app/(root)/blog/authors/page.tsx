import prisma from "@/lib/prisma";

async function Authors() {
  const users = await prisma.user.findMany();

  return (
    <>
      <div>Authors</div>
      {users.map((user) => (
        <h1 key={user.id}>{user.name}</h1>
      ))}
    </>
  );
}

export default Authors;
