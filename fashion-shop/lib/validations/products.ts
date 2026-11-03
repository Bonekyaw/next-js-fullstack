import { z } from "zod";

export const productsPageQuerySchema = z.object({
  category: z.enum(["MEN", "WOMEN", "TEENS", "CHILD", "KIDS"]).optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(24).default(12),
});

export type ProductsPageInput = z.infer<typeof productsPageQuerySchema>;
