import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {transporter} from "../lib/sendWelcomeMail.js";

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
            html: {path: "server/controllers/welcome_design.html"}, // html body
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

        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })

        res.status(200).json({
            message: "Login success",
            status: true,
            user
        })

    } catch (error) {
        console.log(error)
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
            status : true,
            user
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Something went wrong try again",
            status : false,
            error
        })
    }
}