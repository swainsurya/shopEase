import { productModel } from "../models/product.model.js";
import { userModel } from "../models/user.model.js";

// get all products 
export const allProducts = async(req, res) => {
    const products = await productModel.find().sort({createdAt : -1});
    res.json({products})
}

// get one product by id 
export const getProductById = async(req, res) => {
    const {id} = req.params
    const product = await productModel.findById(id)
    res.json({product})
}

// comment product by id 
export const commentProduct = async(req, res) => {
    // comment 
    const {userId} = req
    const { message } = req.body
    const {id} = req.params
    try {
        const product = await productModel.findById(id)
        const user = await userModel.findById(userId)
        product.comments.push({message , user: userId, username: user.username})
        product.comments = product.comments.reverse()
        await product.save()
        res.json({message : "Comment added", product})
    } catch (error) {
        console.log(error)
    }
}

// get products by search term 
export const getProductBySearch = async(req, res) => {
    const {term} = req.body;
    try {
        const products = await productModel.find({$text:{$search: term}})
        if(!products) return res.json({
            products: []
        })
        return res.json({
            products
        })
    } catch (error) {
        return res.status(400).json({
            message: "Server issue"
        })
    }
}