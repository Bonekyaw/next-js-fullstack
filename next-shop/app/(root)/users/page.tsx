import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
}

async function UsersPage() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const users: User[] = await response.json();
  return (
    <>
      <h1>Author List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              {user.name} ({user.email})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UsersPage;
