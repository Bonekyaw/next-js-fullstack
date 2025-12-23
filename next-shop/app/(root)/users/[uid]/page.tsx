interface Post {
  id: string;
  title: string;
  views: number;
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(userId: string): Promise<User> {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`).then(
    (res) => res.json(),
  );
}

async function getPosts(userId: string): Promise<Post[]> {
  return await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/posts?authorId=${userId}`,
  ).then((res) => res.json());
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;

  //   const userData = getUser(uid);
  //   const postsData = getPosts(uid);
  //   const [user, posts] = await Promise.all([userData, postsData]);

  //   const [userResult, postsResult] = await Promise.allSettled([
  //     getUser(uid),
  //     getPosts(uid),
  //   ]);
  //   const user = userResult.status === "fulfilled" ? userResult.value : null;
  //   const posts = postsResult.status === "fulfilled" ? postsResult.value : [];

  preload(uid);

  const user = await getUser(uid);

  return (
    <>
      <h1>Name : {user.name}</h1>
      <p>Email : {user.email}</p>
      {user?.email != "admin@admin.com" && <Posts userId={uid} />}
    </>
  );
}

const preload = (userId: string) => {
  void getPosts(userId);
};

// async function Posts({ posts }: { posts: Post[] }) {
async function Posts({ userId }: { userId: string }) {
  const posts = await getPosts(userId);

  return (
    <>
      <p className="font-bold text-green-400">Post List</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} - views({post.views})
          </li>
        ))}
      </ul>
    </>
  );
}
