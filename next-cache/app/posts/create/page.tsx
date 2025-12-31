import CreatePostForm from "@/app/ui/create-form";

function CreatePost() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Create a new post</h1>
      <CreatePostForm />
    </div>
  );
}

export default CreatePost;
