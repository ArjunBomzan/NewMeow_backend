import { Router } from "express";
import { getUser, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import { upload } from "../middleware/files.middleware.js";
import { VerifyToken } from "../middleware/auth.middleware.js";
import Joi from "joi";
import validator from "express-joi-validation"
import fs from 'fs'

const router = Router()
const validate = validator.createValidator()
const registerValidationSchema = Joi.object({
  fullname: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(14).required().pattern(new RegExp("^(?=.*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\\d).{8,}$")).messages({
    "string.pattern.base": "Password must include at least one special character, one uppercase letter, and one digit."
  })
})


router.route('/register').post(upload.single("profile_pic"), validate.body(registerValidationSchema), (req, res, next) => {
  const imagePath = path.join(path.resolve(), product.image)
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err)
    }
  })
  next()
}, userRegister)
router.route('/login').post(userLogin)
router.route('/logout').post(VerifyToken, userLogout)
router.route('/get-user').get(VerifyToken, getUser)

export default router