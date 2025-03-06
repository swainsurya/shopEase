import { Router } from "express"
import { login, logout, register } from "../controllers/user.js"

const userRouter = Router()

// auths routes
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)

// profile fetching TODO

export default userRouter ;