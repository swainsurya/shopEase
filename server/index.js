import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/connectDB.js"
import adminRouter from "./routes/admin.routes.js"
import fileUpload from "express-fileupload"
import userRouter from "./routes/user.routes.js"
import productRoute from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.route.js"

const app = express()
const port = process.env.PORT || 5000

connectDB()
app.use(express.json())
app.use(cookieParser())


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "tmp",
    createParentPath : true,
    limits : {
        fileSize : 5*1024*1024
    },
}))

app.use("/admin/product",adminRouter)
app.use("/user",userRouter)
app.use("/product",productRoute)
app.use("/cart",cartRoutes)

app.get("/",(req,res) => {
    res.json({
        message : "Server running fine"
    })
})

app.listen(port, () => {
    console.log("App listening successfully")
})