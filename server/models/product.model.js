import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    message : { type : String },
    user : { type : mongoose.Schema.Types.ObjectId, ref: "users"  },
    username : {type : String}
},{timestamps:true})

const productSchema = new mongoose.Schema({
    name : { type : String },
    description : { type : String },
    image : { type : String },
    price : { type : Number } ,
    category: {type:String},
    comments : [commentSchema]
},{ timestamps : true })

productSchema.index({name: "text", description: "text"})

export const productModel = mongoose.model("products", productSchema) ;