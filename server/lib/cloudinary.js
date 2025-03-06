import "dotenv/config"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    secure : true,
    api_key : process.env.CLOUDINARY_API,
    api_secret : process.env.CLOUDINARY_SECRET,
    cloud_name : process.env.CLOUDINARY_CLOUDNAME
})

export default cloudinary