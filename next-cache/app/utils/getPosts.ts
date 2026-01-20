"use cache";

import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";

export async function getPosts() {
  // cacheLife("hours")
  cacheTag("posts");
  console.log("GetPosts API calling ----");

  return prisma.post.findMany();
}

export async function getPost(id: number) {
  // cacheLife("hours")
  cacheTag("posts", `post-${id}`);
  console.log("GetPost API calling ----");

  return prisma.post.findUnique({ where: { id } });
}
