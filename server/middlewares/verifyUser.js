import jwt from "jsonwebtoken"

export const verifyUser = async(req , res , next) => {
    try {
        const {token} = req.cookies
        if(!token) {
            return res.json({
                message : "Unathorized User"
            })
        }
        const decode = jwt.decode(token,process.env.JWT)
        req.userId = decode.userId
        next()
    } catch (error) {
        res.json({
            message : error
        })
    }
}