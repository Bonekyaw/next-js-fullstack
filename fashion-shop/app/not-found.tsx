import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  ...noIndexMetadata,
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you requested does not exist or is no longer available.
      </p>
      <Button>
        <Link href="/">Back to shop</Link>
      </Button>
    </main>
  );
}
