"use client";

import { use } from "react";
import { motion } from "motion/react";

function UserList({
  users,
}: {
  users: Promise<{ id: number; name: string | null; email: string }[]>;
}) {
  const allUsers = use(users);
  return (
    <>
      <motion.div
        animate={{
          scale: 2,
          transition: { duration: 2 },
        }}
      >
        {allUsers.map((user) => (
          <h1 key={user.id}>
            {user?.name} - {user.email}
          </h1>
        ))}
      </motion.div>
    </>
  );
}

export default UserList;
