import {z} from "zod";

const loginValidator = z.object({
    username : z.string().min(3,{
        message : "Username must be greater than 3"
    }),
    password : z.string().min(8,{
        message : "Password must be 8 chars"
    })
})

export {loginValidator}