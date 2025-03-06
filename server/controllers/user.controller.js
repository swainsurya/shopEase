import { userModel } from "../models/user.model.js";
import { productModel } from "../models/product.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async(req, res) => {
    const { username , email, password } = req.body
    try {
        const userExists = await userModel.findOne({email})
        if(userExists) {
            return res.json({
                message : "User already exists",
                status : false
            })
        }
        const hashedPassword = await bcrypt.hashSync(password, 10) ;
        const newUser = new userModel({ username , email , password: hashedPassword })
        await newUser.save()

        // Todo Email sent to user 

        res.status(200).json({
            message : `Hello and welcome ${username} please login`,
            status : true
        })
    } catch (error) {
        res.status(404).json({
            message : error.message,
            status : false
        })
    }
}


export const login = async(req , res) => {
    const {email, password} = req.body ;
    try {
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({
                message : "User does not exists",
                status : false
            })
        }
        const comparePass = await bcrypt.compareSync(password, user.password) ;
        if(!comparePass) {
            return res.status(404).json({
                message : "Password does not matched",
                status : false
            })
        }

        const token = await jwt.sign({userId : newUser._id}, process.env.JWT , {expiresIn : "2d"})

        res.cookie("token",token,{
            httpOnly : true,
            secure : false
        })

        res.status(200).json({
            message : "Login success",
            status : true
        })

    } catch (error) {
        
    }
}