import { Suspense } from "react";
import { connection } from "next/server";

import { getSession } from "@/lib/session";
import { Skeleton } from "@/components/ui/skeleton";
import ShopHeader from "@/components/layout/shop-header";

function ShopLayoutFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-32 rounded-md" />
          <div className="flex items-center gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-20 rounded-md" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="size-9 rounded-full" />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-96 max-w-full" />
          </div>
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-3/4 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

async function ShopShell({ children }: { children: React.ReactNode }) {
  await connection();
  const session = await getSession();
  // You can use the session information here if needed
  // We will use this session for Favourite Provider later

  return (
    <div>
      <ShopHeader />
      {children}
    </div>
  );
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<ShopLayoutFallback />}>
      <ShopShell>{children}</ShopShell>
    </Suspense>
  );
}
