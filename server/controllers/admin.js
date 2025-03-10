import { productModel } from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs"


const uploadToCloudinary = async(file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath , {
            resource_type : "auto"
        })
        await fs.unlink(file.tempFilePath,(err)=>{
            if(err){
                console.log(err)
            }
            console.log("file deleted")
        })
        return result.secure_url
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = async(req, res) => {
    // const imageFile = req.files.imageFile
    // save to cloudinary
    // const imgurl = await uploadToCloudinary(imageFile)
    const { name, description, image , price , category } = req.body ;
    const product = new productModel({name, description , image , price , category})
    await product.save()
    res.json({
        message : "Product Added",
        status : true,
        product
    })
}

export const delProduct = async(req, res) => {
    const {id} = req.params
    await productModel.findByIdAndDelete(id)
    res.json({
        message : "Product Deleted",
        status : true
    })
}

export const editProduct = async(req, res) => {
    const {id} = req.params
    const {name , description, price} = req.body
    const product = await productModel.findByIdAndUpdate(id, {name , description, price}, {new : true})
    await product.save()
    res.json({
        message : "Product Edited",
        product
    })
}