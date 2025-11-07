interface Post {
  id: string;
  title: string;
  author: string;
  views: number;
}
async function BlogList() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
  const response = await fetch("http://localhost:4000/posts?search=auth", {
    // next: {
    //   // revalidate: 3600, // Time-based Revalidation
    //   tags: ["posts"], // On-demand Revalidation
    // },
    // cache: "no-store",
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts: Post[] = await response.json();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default BlogList;
