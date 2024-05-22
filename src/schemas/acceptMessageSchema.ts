import { z } from "zod";

export const signinschemaValidation = z.object({
    acceptMessages: z.boolean(),
})