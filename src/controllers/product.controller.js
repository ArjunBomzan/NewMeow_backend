import { Product } from '../models/Product.model.js'
import { User } from '../models/User.model.js'
import fs from 'fs'
import path from 'path'

const addProduct = async (req, res) => {
  console.log(req)
  try {
    const { title, description, price, in_stock, Categories, rating } = req.body;
    console.log('files', req.file)
    const imagePath = `/public/images/${req.file.filename}`

    const Admin = await User.findById(req.user._id)
    console.log('ad', Admin)
    if (!Admin.isAdmin) {
      return res.status(401).json({ message: "Unauthorized action" })
    }

    const product = await Product.create({
      title,
      description,
      price,
      in_stock,
      Categories,
      rating,
      image: imagePath
    })

    if (!product) {
      return res.status(500).json({
        message: 'Something went wrong'
      })
    }

    return res.status(201).json({
      data: product,
      message: "Product created successfully"
    })
  } catch (error) {
    console.log("Error while adding product", error)
    res.status(500).json({
      message: error
    })
  }
}

const fetchProducts = async (req, res) => {
  try {

    let perPage = parseInt(req.query.perPage) || 5
    let page = parseInt(req.query.page) || 1
    let category = req.query.category

    let productFilter = {}
    if (category) {
      productFilter.Categories = category

    }

    let products = await Product.find(productFilter)
      .skip((page - 1) * perPage)
      .limit(perPage)


    let totalProducts = await Product.countDocuments(productFilter)

    res.status(200).json({
      page: page,
      perPage: perPage,
      total: totalProducts,
      data: products
    })
  } catch (error) {
    console.log("error while fetch products", error)
    res.status(500).json({ message: "Something went wrong" })
  }

}


const fetchSingleProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
    console.log('prod', product)
    console.log('params', req.params)
    if (!product) {
      return res.status(404).json({
        message: "could not find the product"
      })
    }
    return res.status(200).json({
      message: "product found",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      message: "could not fetch the product "
    })
  }
}

const deleteProduct = async (req, res) => {
  try {

    const Admin = await User.findById(req.user._id)
    console.log('Admin', Admin)
    if (!Admin.isAdmin) {
      return res.status(401).json({ message: "Unauthorized request" })
    }

    console.log('params', req.params)
    const product = await Product.findById(req.params._id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    await Product.deleteOne({ _id: req.params._id })
    if (product.image) {

      console.log('absolue path', path.resolve())
      console.log('image path', product.image)
      const imagePath = path.join(path.resolve(), product.image)
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err)
        }
      })
    }

    res.status(200).json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Product deleting error", error)
    res.status(500).json({ message: "Something went wrong" })
  }
}




export { addProduct, fetchProducts, deleteProduct, fetchSingleProduct }