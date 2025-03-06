import { Router } from "express"
import { addProduct, delProduct, editProduct } from "../controllers/admin.js"
const adminRouter = Router() 

adminRouter.post("/add",addProduct)
adminRouter.delete("/del/:id", delProduct)
adminRouter.put("/edit/:id",editProduct)

export default adminRouter