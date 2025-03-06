import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { addToCart, getAllCarts, removeItemById } from "../controllers/cart.js";

const cartRoutes = Router();

cartRoutes.get("/",verifyUser,getAllCarts)
cartRoutes.post("/add",verifyUser,addToCart)
cartRoutes.post("/remove",verifyUser,removeItemById)

export default cartRoutes