import { Router } from "express";
import { allOrders, changeOrderStats, getOrders, makeOrder } from "../controllers/orders.js";
import { getVerifiedUser, verifyUser } from "../middlewares/verifyUser.js";

const orderRouter = Router();

orderRouter.post("/add",getVerifiedUser,makeOrder)
orderRouter.post("/change-stats", changeOrderStats)
orderRouter.get("/order",getVerifiedUser,getOrders)
orderRouter.get("/all",allOrders)

export default orderRouter