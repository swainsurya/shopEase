import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/connectDB.js"
import adminRouter from "./routes/admin.routes.js"

const app = express()
const port = process.env.PORT || 5000

connectDB()
app.use(express.json())
app.use(cookieParser())

app.use("/product/",adminRouter)

app.get("/",(req,res) => {
    res.json({
        message : "Server running fine"
    })
})

app.listen(port, () => {
    console.log("App listening successfully")
})