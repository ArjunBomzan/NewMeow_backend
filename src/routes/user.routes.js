import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import { upload } from "../middleware/files.middleware.js";
import { VerifyToken } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/register').post(upload.single("profile_pic"), userRegister)
router.route('/login').post(userLogin)
router.route('/logout').post(VerifyToken, userLogout)

export default router