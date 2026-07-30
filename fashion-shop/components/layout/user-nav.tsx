import { getSession } from "@/lib/session";
import UserNavigationClient from "./user-nav-client";

async function UserNavigation() {
  const session = await getSession();
  return <UserNavigationClient session={session} />;
}

export default UserNavigation;
