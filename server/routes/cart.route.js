import { Router } from "express";
import { getVerifiedUser, verifyUser } from "../middlewares/verifyUser.js";
import { addToCart, getAllCarts, removeItemById } from "../controllers/cart.js";

const cartRoutes = Router();

cartRoutes.get("/",getVerifiedUser,getAllCarts)
cartRoutes.post("/add/:productId",getVerifiedUser,addToCart)
cartRoutes.post("/remove",getVerifiedUser,removeItemById)

export default cartRoutes