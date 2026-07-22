import { auth } from "./auth";
import { headers } from "next/headers";

export async function getSession() {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  // You can add additional logic here if needed,
  // such as checking for specific user roles or permissions.

  return session;
}
