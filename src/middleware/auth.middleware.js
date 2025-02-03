import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"

export const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    if (!token) {
      res.status(401).json({
        message: "Unauthorized request"
      })
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refresh_token")

    if (!user) {
      res.status().json({
        message: "User not found"
      })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      message: error.message
    })
  }
}
