// http://localhost:3000/api/v1/users

import prisma from "@/lib/prisma";
import { cacheLife } from "next/cache";
import { NextRequest } from "next/server";

// export const revalidate = 60; // every 1 min
// export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  //   console.log("Getting User API ----");

  //   return Response.json({ name: "Hello Developer" });
  // return Response.json({ number: Math.random() });

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  // Validation Logic

  console.log("page", page, "limit", limit);

  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(message, { status: 500 });
  }
}

async function getUsers() {
  "use cache";
  cacheLife("minutes");

  return prisma.user.findMany();
}

export async function POST(request: NextRequest) {
  // const { page, limit } = await request.json();
  const formData = await request.formData();
  const page = formData.get("page");
  const limit = formData.get("limit");

  // Add Validation Logic

  console.log("page", page, "limit", limit);

  try {
    const users = await getUsers();
    return Response.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(message, { status: 500 });
  }
}
