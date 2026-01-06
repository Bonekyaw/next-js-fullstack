"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

function Linker({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <Link href={href} onNavigate={() => router.refresh()}>
      {children}
    </Link>
  );
}

export default Linker;
