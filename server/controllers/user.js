import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { transporter } from "../lib/sendWelcomeMail.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.json({
                message: "User already exists",
                status: false
            })
        }
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()

        // Todo Email sent to user 
        await transporter.sendMail({
            from: "swainsuryakanta97@gmail.com",
            to: email,
            subject: "Welcome to ShopEase",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ShopEase Mail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
        }
        .logo {
            width: 120px;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <h4 class="text-2xl font-bold text-blue-700">SHOPEASE</h4>
        <h2>Welcome to ShopEase Mail!</h2>
        <p>Thank you for joining ShopEase! Stay updated with your orders, exclusive offers, and more.</p>
        <a href="#" class="button">Explore ShopEase</a>
    </div>

</body>
</html>
`, 
        });

        res.status(200).json({
            message: `Hello and welcome ${username} please login`,
            status: true,
            user
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Im here from login")
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                message: "User does not exists",
                status: false
            })
        }
        const comparePass = await bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return res.status(404).json({
                message: "Password does not matched",
                status: false
            })
        }

        const token = await jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: "2d" })
        console.log(user)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })

        res.status(200).json({
            message: "Login success",
            status: true,
            user,
            token
        })

    } catch (error) {
        return res.status(404).json({
            error
        })
    }
}

export const logout = async (req, res) => {
    await res.clearCookie("token");
    res.json({
        message: "Logout Successful",
        status: true
    })
}

export const getUser = async (req, res) => {
    const { userId } = req
    console.log(userId)
    const user = await userModel.findById(userId)
    res.json({ user })
}

export const setAddress = async (req, res) => {
    const { userId } = req
    const { fullName, phone, address1, address2, city, state, country, pincode } = req.body
    try {
        const user = await userModel.findById(userId);
        user.address = { fullName, email: user.email, phone, address1, address2, city, state, country, pincode }

        await user.save()
        res.json({
            message: "Profile Updated",
            status: true,
            user
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Something went wrong try again",
            status: false,
            error
        })
    }
}