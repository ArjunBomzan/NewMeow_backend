import { Router } from "express";
import { addProduct, deleteProduct, fetchProducts, fetchSingleProduct, updateProduct } from "../controllers/product.controller.js";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/files.middleware.js";

const router = Router()

router.route('/add-product').post(

  upload.single("image"),
  VerifyToken, addProduct)

router.route('/fetch-products').get(fetchProducts)
router.route('/fetch-product/:id').get(fetchSingleProduct)
router.route('/update-product/:id').patch(VerifyToken, upload.single("image"), updateProduct)
router.route('/delete-product/:_id').delete(VerifyToken, deleteProduct)
export default router