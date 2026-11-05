import { z } from "zod";

export const addToCartSchema = z.object({
  variantId: z.string().min(1, "Please select a size and color"),
  quantity: z.number().int().min(1).max(99),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
