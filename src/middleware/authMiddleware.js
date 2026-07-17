import jsonwebtoken, {decode} from "jsonwebtoken"
import { config } from "../../config.js"

export const authValidation = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const {auth} = req.cookies
            if(!auth){
                return res.status(403).json({message:"Cookie Not Found"})
            }
            const decoded = jsonwebtoken.verify(auth, config.jwt.secret)

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message:"Access Denied"})
            }

            next()
        } catch (error) {
            console.log("Error" + error)
        }
    }
}