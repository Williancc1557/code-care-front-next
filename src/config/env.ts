import { z } from "zod/v3";

const envSchema = z.object({
  NEXT_API_BASE_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
