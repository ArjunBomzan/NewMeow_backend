import { Product } from '../models/Product.model.js'
import { User } from '../models/User.model.js'

const addProduct = async (req, res) => {
  try {
    const { title, description, price, in_stock, Categories, rating } = req.body
    console.log('files', req.file)
    const imagePath = `/uploads/images/${req.file.filename}`

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

    let sortBy = {
      createdAt: -1,
    };
    let productFilter = {}
    if (category) {
      productFilter.Categories = category
    }

    let products = await Product.find(productFilter)
      .sort(sortBy)
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



export { addProduct, fetchProducts }