"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-client";

type UserNavigationClientProps = {
  session: any;
};

function UserNavigationClient({ session }: UserNavigationClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!session) {
    return (
      <Button variant="ghost" size="icon">
        <Link href="/login">
          <User />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      Log Out
    </Button>
  );
}

export default UserNavigationClient;
