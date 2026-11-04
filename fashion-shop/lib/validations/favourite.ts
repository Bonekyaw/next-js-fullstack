import { z } from "zod";

export const toggleFavoriteSchema = z.object({
  productId: z.string().min(7),
});

export type ToggleFavoriteInput = z.infer<typeof toggleFavoriteSchema>;
