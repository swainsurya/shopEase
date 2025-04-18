import { Router } from "express"
import { getUser, login, logout, register, setAddress } from "../controllers/user.js"
import { getVerifiedUser, verifyUser } from "../middlewares/verifyUser.js"

const userRouter = Router()

// auths routes
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)

userRouter.post("/user",getVerifiedUser,getUser)

// profile fetching TODO
userRouter.post("/address",getVerifiedUser,setAddress)


export default userRouter ;