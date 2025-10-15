async function BookDetail({
  params,
}: {
  params: Promise<{ authorId: string; bookId: string }>;
}) {
  const { authorId, bookId } = await params;
  return (
    <div>
      BookDetail - {bookId} by Author {authorId}
    </div>
  );
}

export default BookDetail;
