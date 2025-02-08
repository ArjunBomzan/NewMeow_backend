import { Router } from "express";
import { addProduct, fetchProducts } from "../controllers/product.controller.js";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/files.middleware.js";

const router = Router()

router.route('/add-product').post(upload.single("image"), VerifyToken, addProduct)
router.route('/fetch-products').get(fetchProducts)

export default router