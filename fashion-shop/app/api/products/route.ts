import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import z from "zod";

import { queryProductsPage } from "@/lib/queries/product-page";
import { productsPageQuerySchema } from "@/lib/validations/products";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const parsed = productsPageQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    cursor: searchParams.get("cursor") ?? undefined,
    limit: searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const { category, cursor, limit } = parsed.data;

  if (!cursor) {
    return NextResponse.json(
      { success: false, error: "Cursor is required" },
      { status: 400 },
    );
  }

  try {
    const page = await queryProductsPage(category, cursor, limit);
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    // console.error("Error fetching products page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products page" },
      { status: 500 },
    );
  }
}
