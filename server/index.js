import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/connectDB.js"
import adminRouter from "./routes/admin.routes.js"
import fileUpload from "express-fileupload"
import userRouter from "./routes/user.routes.js"
import productRoute from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.route.js"
import orderRouter from "./routes/orders.route.js"
import cors from "cors"
import "dotenv/config"

const app = express()
const port = process.env.PORT || 5000
const __dirname = path.resolve()

connectDB()
app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || "*"); // Allow all origins dynamically
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "tmp",
    createParentPath: true,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
}))

app.use("/api/admin/product", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRouter)

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "/client/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    })
}

app.get("/api", (req, res) => {
    res.json({
        message: "Server running fine"
    })
})

app.get("/", (req, res) => {
    res.json({
        message: "Server running correct"
    })
})

app.listen(port, () => {
    console.log("App listening successfully")
})