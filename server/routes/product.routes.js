import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { commentProduct } from "../controllers/product.js";

const productRoute = Router()

productRoute.post("/comment/:id",verifyUser, commentProduct)

export default productRoute ;