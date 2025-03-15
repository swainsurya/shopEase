import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { allProducts, commentProduct, getProductById, getProductBySearch } from "../controllers/product.js";

const productRoute = Router()

productRoute.post("/comment/:id",verifyUser, commentProduct)
productRoute.get("/all",allProducts)
productRoute.get("/product/:id",getProductById)
productRoute.post("/product/q",getProductBySearch);

export default productRoute ;