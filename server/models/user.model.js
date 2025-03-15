import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    productId : { type : String , required : false },
    productName : { type : String, required : true },
    productDesc : { type : String, required : true },
    productPrice : { type : Number, required : true },
    productImage : { type : String, required : true },
    qty : { type: Number, default : 1 },
})

const addressSchema = new mongoose.Schema({
    fullName : { type:String },
    email : { type:String },
    phone : { type:String },
    address1 : { type:String },
    address2 : { type:String },
    city : { type:String },
    state : { type:String },
    country : { type:String },
    pincode : { type:String }
})

const orderSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    productImage: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, enum:["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending"}
},{timestamps: true})

const userSchema = new mongoose.Schema({
    username : { type : String, required : true },
    email : { type : String, required : true },
    password : { type : String , required : true },
    address : addressSchema,
    carts : [cartSchema],
    orders : [orderSchema]
},{ timestamps : true })

export const userModel = mongoose.model("users",userSchema)