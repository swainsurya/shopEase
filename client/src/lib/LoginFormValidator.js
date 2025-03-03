import {z} from "zod";

const loginValidator = z.object({
    email: z.string().min(1,{
        message : "This is required"
    }).email("This is not a valid email"),
    password : z.string().min(8,{
        message : "Password must be 8 chars"
    })
})

const registerValidator = z.object({
    username : z.string().min(5,{
        message: "Username must be 5 chars"
    }),
    email: z.string().min(1,{
        message : "This is required"
    }).email("This is not a valid email"),
    password : z.string().min(8,{
        message : "Password must be 8 chars"
    })
})

export {loginValidator, registerValidator}