import { z } from "zod";

export const signinschemaValidation = z.object({
    identifier: z.string(),
    password: z.string(),
})