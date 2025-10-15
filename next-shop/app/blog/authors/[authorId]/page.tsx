async function AuthorDetail({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = await params;
  return <div>AuthorDetail - {authorId}</div>;
}

export default AuthorDetail;
