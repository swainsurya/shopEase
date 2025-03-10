import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { allProducts, commentProduct, getProductById } from "../controllers/product.js";

const productRoute = Router()

productRoute.post("/comment/:id",verifyUser, commentProduct)
productRoute.get("/all",allProducts)
productRoute.get("/product/:id",getProductById)

export default productRoute ;