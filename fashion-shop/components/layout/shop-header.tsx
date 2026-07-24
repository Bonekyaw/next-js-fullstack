import { CATEGORIES } from "@/lib/product-utils";
import Link from "next/link";

export default function ShopHeader() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Fashion Shop
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/categories/${category.value}`}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {category.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link
            href="/cart"
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            Cart
          </Link>
          <div>User Profile</div>
        </div>
      </div>
    </header>
  );
}
