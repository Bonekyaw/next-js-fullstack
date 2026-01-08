import prisma from "@/lib/prisma";
import { cacheLife } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const user = await getUser(+id);
    // If user is null, ....
    return Response.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(message, { status: 500 });
  }
}

async function getUser(id: number) {
  "use cache";
  cacheLife("minutes");

  return prisma.user.findUnique({ where: { id } });
}
