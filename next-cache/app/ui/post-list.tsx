import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cacheLife } from "next/cache";

async function PostList() {
  "use cache";
  cacheLife("hours");

  const posts = await prisma.post.findMany();
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
