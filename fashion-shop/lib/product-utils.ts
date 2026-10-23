import { Category } from "@/app/generated/prisma/client";

export const CATEGORIES = [
  { value: "MEN", label: "Men" },
  { value: "WOMEN", label: "Women" },
  { value: "TEENS", label: "Teens" },
  { value: "CHILD", label: "Child" },
  { value: "KIDS", label: "Kids" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export function getCategoryLabel(category: Category) {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function formatPrice(price: number | { toString(): string }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price));
}
