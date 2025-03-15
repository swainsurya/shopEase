import { userModel } from "../models/user.model.js";

export const makeOrder = async(req, res) => {
    const {productName , productImage, price} = req.body ;
    const {userId} = req
    try {
        const user = await userModel.findById(userId);
        if(!user) return res.status(404).json({message: "UnAthorized!"})
        user.orders.push({productName, productImage, price})
        await user.save();
        return res.status(200).json(({
            message: "Order Completed",
            status: true,
            user
        }))
    } catch (error) {
        return res.status(400).json({
            message: "Internal Server Error",
            status: false
        })
    }
}

// ADMIN CAN CHANGE THE STATUS OF ORDER
export const changeOrderStats = async(req, res) => {
    const {status, userId, orderId} = req.body;
    const user = await userModel.findById(userId);
    const orderIndex = user.orders.findIndex((order)=> order._id == orderId) ;
    const userOrder = user.orders[orderIndex];
    userOrder.status = status;
    await user.save()
}

// get Orders by user 
export const getOrders = async(req , res) => {
    const {userId} = req ;
    const user = await userModel.findById(userId);
    if(!user) {
        return res.status(400).json({
            message: "Unathorized"
        })
    }
    const orders = user.orders
    return res.json({orders});
}

// get all orders by admin
export const allOrders = async(req , res) => {
    const usersOrders = await userModel.find().populate("orders")
    return res.json({usersOrders})
}