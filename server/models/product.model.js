import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
    message : { type : String },
    user : { type : mongoose.Schema.Types.ObjectId, ref: "users"  },
    username : {type : String}
})

const productSchema = new mongoose.Schema({
    name : { type : String },
    description : { type : String },
    image : { type : String },
    price : { type : Number } ,
    comments : [commentSchema]
},{ timestamps : true })

export const productModel = mongoose.model("products", productSchema) ;