import { z } from "zod";

const loginValidator = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
});

const registerValidator = z.object({
    username: z.string().min(5, {
        message: "Username must be at least 5 characters long"
    }).max(20, {
        message: "Username cannot exceed 20 characters"
    }),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
});

export { loginValidator, registerValidator };