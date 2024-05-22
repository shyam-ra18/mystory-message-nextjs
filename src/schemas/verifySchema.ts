import { z } from "zod";

export const verifyschemaValidation = z.object({
    code: z.string().length(6, 'Verifiaction Code must be atleast 6 digits')
})