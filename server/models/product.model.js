import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
    message : { type : String },
    user : { userId : String ,ref : "users" }
})

const productSchema = new mongoose.Schema({
    name : { type : String , required : true },
    description : { type : String },
    image : { type : String , required : true },
    price : { type : Number , required : true } ,
    comments : [commentSchema]
},{ timestamps : true })

export const productModel = mongoose.model("products", productSchema) ;