import { userModel } from "../models/user.model.js";
import { productModel } from "../models/product.model.js";

export const getAllCarts = async(req, res) => {
    const {userId} = req
    const user = await userModel.findById(userId)
    res.json({
        message : "Item added to cart",
        userCart : user.carts
    })
}

export const addToCart = async(req , res) => {
    const {userId} = req
    const {productId} = req.body
    try {
        const user = await userModel.findById(userId)
        const product = await productModel.findById(productId.toString())

        const cartItem = { productId, productName: product.name, productDesc: product.description, productImage: product.image, productPrice: product.price,qty: 1 }
        // if cart already exists
        const cartCheck = user.carts.find(cart => cart.productId == productId)
        if(cartCheck) {
            cartCheck.qty += 1;
            cartCheck.productPrice = cartCheck.qty*product.price ;
        }
        else {
            user.carts.push(cartItem)
        }
        await user.save()

        res.json({
            message : "Item added to cart",
            userCart : user.carts
        })
    } catch (error) {
        
    }
}

export const removeItemById = async(req, res) => {
    const {cartId} = req.body 
    const {userId} = req
    const user = await userModel.findById(userId)
    user.carts = user.carts.filter((cart) => cart._id != cartId)
    await user.save()
    res.json({
        message : "Item removed Successfully",
        userCart : user.carts
    })
}