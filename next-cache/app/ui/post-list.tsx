import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPosts } from "../utils/getPosts";
// import { cacheLife, cacheTag } from "next/cache";

async function PostList() {
  // "use cache";
  // cacheLife("hours");
  // cacheTag("posts");

  // const posts = await prisma.post.findMany();

  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className="w-full max-w-sm mb-2">
          <CardHeader>
            <CardTitle>
              {post.title} -{" "}
              <span className="text-sm">
                {post.published ? "published" : "pending"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{post.content}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default PostList;
