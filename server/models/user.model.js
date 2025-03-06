import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    productId : { type : mongoose.Schema.Types.ObjectId , required : true },
    productName : { type : String, required : true },
    productDesc : { type : String, required : true },
    productPrice : { type : Number, required : true },
    productImage : { type : String, required : true },
    qty : { type: Number, default : 1 },
})

const userSchema = new mongoose.Schema({
    username : { type : String, required : true },
    email : { type : String, required : true },
    password : { type : String , required : true },
    address : [],
    carts : [cartSchema],
    orders : []
},{ timestamps : true })

export const userModel = mongoose.model("users",userSchema)