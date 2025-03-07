import { Router } from "express"
import { getUser, login, logout, register } from "../controllers/user.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const userRouter = Router()

// auths routes
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)

userRouter.get("/user",verifyUser,getUser)

// profile fetching TODO


export default userRouter ;