"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type CategoryValue, CATEGORIES } from "@/lib/product-utils";

function CategoryFilterInner() {
  const searchParams = useSearchParams();
  const activeCategory =
    (searchParams.get("category") as CategoryValue) || null;

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          !activeCategory
            ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
            : "hover:bg-muted hover:text-accent-foreground bg-background border-border text-muted-foreground",
        )}
      >
        All
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category.value}
          href={`/?category=${category.value}`}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === category.value
              ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
              : "hover:bg-muted hover:text-accent-foreground bg-background border-border text-muted-foreground",
          )}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}

export default function CategoryFilter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryFilterInner />
    </Suspense>
  );
}
