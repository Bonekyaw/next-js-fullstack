"use client";
import { usePathname } from "next/navigation";

function NotFoundPage() {
  const pathname = usePathname(); // localhost:3000/produc/123
  const firstRoute = pathname.split("/")[1];

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">404 | {firstRoute} Page Not Found</h1>
    </div>
  );
}

export default NotFoundPage;
