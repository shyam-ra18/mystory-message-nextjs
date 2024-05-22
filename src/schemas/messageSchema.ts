import { z } from "zod";

export const messageschemaValidation = z.object({
    content: z
        .string()
        .min(10, "Content must be at least of 10 characters")
})