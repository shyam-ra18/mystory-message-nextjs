import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, 'Username must be atleast 2 charcters')
    .max(10, 'Username must be no more than 10 charcters')
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain speacial characters");

export const signupSchemaValidation = z.object({
    username: usernameValidation,
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, 'Password must be atleast 6 charcters')
})