import { Router } from "express";
import { allOrders, changeOrderStats, getOrders, makeOrder } from "../controllers/orders.js";
import { getVerifiedUser, verifyUser } from "../middlewares/verifyUser.js";

const orderRouter = Router();

orderRouter.post("/add",getVerifiedUser,makeOrder)
orderRouter.post("/change-stats", changeOrderStats)
orderRouter.post("/order",getVerifiedUser,getOrders)
orderRouter.post("/all",allOrders)

export default orderRouter