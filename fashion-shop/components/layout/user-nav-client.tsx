"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "../ui/button";

type UserNavigationClientProps = {
  session: any;
};

function UserNavigationClient({ session }: UserNavigationClientProps) {
  if (!session) {
    return (
      <Button variant="ghost" size="icon">
        <Link href="/login">
          <User />
        </Link>
      </Button>
    );
  }
  return <div>AuthUser</div>;
}

export default UserNavigationClient;
