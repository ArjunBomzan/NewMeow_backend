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
        quantity: product.quantity || 1
      })


    }

    console.log('myap', mapped_products)

    const order = await Order.create({
      products: mapped_products,
      created_by: req.user._id
    })

    return res.status(201).json({
      data: order,
      message: "Order Created Successfully"
    })
  } catch (error) {
    console.log("Error in creating order", error)
    return res.status(500).json({
      message: "Wrobd"
    })
  }
}

const getAllOrder = async (req, res) => {
  try {
    const Admin = await User.findById(req.user._id)
    if (!Admin.isAdmin) {
      return res.status(403).json({ message: "forbidden request" })
    }

    const orders = await Order.find().populate("created_by")

    console.log('orders', orders)

    return res.status(200).json({
      data: orders,
      message: "orders fetched successfully"
    })
  } catch (error) {
    console.log('error in order', error);
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
}



export {
  createOrder,
  getAllOrder
}