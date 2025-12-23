import { cacheLife } from "next/cache";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
}

async function Posts() {
  "use cache";
  cacheLife("hours");

  const res = await fetch("https://api.vercel.app/blog");
  const posts = await res.json();

  return (
    <section>
      <h3 className="text-lg">Latest Posts - Dynamic Content</h3>
      <ul>
        {posts.slice(0, 5).map((post: Post) => (
          <li key={post.id} className="mb-2">
            {post.title} - By {post.author} on {post.date}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Posts;
