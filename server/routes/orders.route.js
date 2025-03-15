import { Router } from "express";
import { allOrders, changeOrderStats, getOrders, makeOrder } from "../controllers/orders.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const orderRouter = Router();

orderRouter.post("/add",verifyUser,makeOrder)
orderRouter.post("/change-stats", changeOrderStats)
orderRouter.get("/order",verifyUser,getOrders)
orderRouter.get("/all",allOrders)

export default orderRouter