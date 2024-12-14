const jwt = require("jsonwebtoken");
const productModel = require("../models/productSchema");
const CategoryModel = require("../models/categorySchema");

const validateProductInput = (productData) => {
  const {
    team,
    Season,
    Type,
    Brand,
    League,
    price,
    stock,
    categoryID,
    imageURL,
  } = productData;

  if (
    !team ||
    !price ||
    !stock ||
    !categoryID ||
    !imageURL ||
    !Brand ||
    !League ||
    !Season ||
    !Type
  ) {
    return "Fields (team, price, stock, categoryID,imageURL,Brand,League,Season,Type ) are required.";
  }
  return null;
};

const createProduct = async (req, res) => {
  try {
    const {
      team,
      description,
      Season,
      Type,
      price,
      Brand,
      League,
      stock,
      categoryID,
      imageURL,
    } = req.body;

    const validationError = validateProductInput(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const category = await CategoryModel.findById(categoryID);
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID." });
    }

    const newProduct = new productModel({
      team,
      description,
      Season,
      Type,
      price,
      Brand,
      League,
      stock,
      categoryID,
      imageURL,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product: {
        id: newProduct._id,
        team: newProduct.team,
        description: newProduct.description,
        Season: newProduct.Season,
        Type: newProduct.Type,
        Brand: newProduct.Brand,
        League: newProduct.League,
        price: newProduct.price,
        stock: newProduct.stock,
        categoryID: newProduct.categoryID,
        imageURL: newProduct.imageURL,
      },
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const product = await productModel.find({}).populate("categoryID");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Products not found" });
    }
    return res.status(200).json({ success: true, product });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate("categoryID");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      team,
      description,
      Season,
      Type,
      price,
      Brand,
      League,
      stock,
      categoryID,
      imageURL,
    } = req.body;

    const updateFields = {
      team,
      description,
      Season,
      Type,
      price,
      Brand,
      League,
      stock,
      categoryID,
      imageURL,
    };

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
