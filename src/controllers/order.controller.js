import { Order } from "../models/Order.model.js"
import { Product } from "../models/Product.model.js"
import { User } from "../models/User.model.js"


const createOrder = async (req, res) => {
  try {
    console.log("code was here")
    const Admin = await User.findById(req.user._id)
    console.log(Admin)
    if (Admin.isAdmin) {
      return res.status(403).json({
        message: "Forbidden request"
      })
    }
    let mapped_products = []
    for (let product of req.body.products) {
      const dbProduct = await Product.findById(product.product_id)

      mapped_products.push({
        product_id: dbProduct._id,
        name: dbProduct.title,
        price: dbProduct.price,
        quantity: product.quantity
      })

    }

    const order = await Order.create({
      products: mapped_products,
      created_by: req.user._id
    })

    res.status(201).json({
      data: order,
      message: "Order Created Successfully"
    })
  } catch (error) {
    console.log("Error in creating order", error)
    res.status(500).json({
      message: "Wrobd"
    })
  }
}

export {
  createOrder
}