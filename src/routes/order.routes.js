import Router from 'express'
import { VerifyToken } from '../middleware/auth.middleware.js'
import { createOrder } from '../controllers/order.controller.js'

const router = Router()

router.route('/').post(VerifyToken, createOrder)

export default router