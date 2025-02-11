import Router from 'express'
import { VerifyToken } from '../middleware/auth.middleware.js'
import { createOrder, getAllOrder } from '../controllers/order.controller.js'

const router = Router()

router.route('/').post(VerifyToken, createOrder)
router.route('/').get(VerifyToken, getAllOrder)

export default router