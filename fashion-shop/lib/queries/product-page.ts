import { db } from "../prisma";
import { CategoryValue } from "../product-utils";
import { serialize } from "../serialize";

export async function queryProductsPage(
  category: CategoryValue | undefined,
  cursor: string | undefined,
  limit: number,
) {
  let query = db.orm.public.Product.where({ isActive: true });

  if (category) {
    query = query.where({ category });
  }

  let ordered = query.orderBy([(p) => p.createdAt.desc(), (p) => p.id.desc()]);

  if (cursor) {
    const cursorRow = await db.orm.public.Product.select("id", "createdAt")
      .where({ id: cursor })
      .first();

    if (cursorRow) {
      ordered = ordered.cursor({
        createdAt: cursorRow.createdAt,
        id: cursorRow.id,
      });
    }
  }

  const products = await ordered
    .include("productVariants", (v) => v.select("id", "size", "color", "stock"))
    .limit(limit + 1)
    .all();

  const hasMore = products.length > limit;
  const items = hasMore ? products.slice(0, limit) : products;

  return serialize({
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
    hasMore,
  });
}

// 30, 29, 28, 27, 26.   ( cusror = 26 )
// 25, 24, 23, 22, 21 ( Prisma 7 , skip(1) , limit + 1 )
// 25, 24, 23, 22, 21, 20 ( Prisma 8 , limit + 1) - Cursor = 21
