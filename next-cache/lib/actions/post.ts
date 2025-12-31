"use server";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const published = formData.get("published");

  console.log(title, content, published);
}
