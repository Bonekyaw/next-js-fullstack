// http://localhost:3000/api/v1/users

import prisma from "@/lib/prisma";
import { cacheLife } from "next/cache";

// export const revalidate = 60; // every 1 min
// export const dynamic = "force-static";

export async function GET() {
  //   console.log("Getting User API ----");

  //   return Response.json({ name: "Hello Developer" });
  // return Response.json({ number: Math.random() });

  const users = await getUsers();
  return Response.json(users);
}

async function getUsers() {
  "use cache";
  cacheLife("minutes");

  return prisma.user.findMany();
}
