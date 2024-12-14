const productModel = require("../models/productSchema");
const userModel = require("../models/userSchema");
const cartModel = require("../models/cartSchema");
const wishModel = require("../models/wishListSchema");

const addProductToWishList = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Products must be an array." });
    }

    const userId = req.token.userId; 

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let wishList = await wishModel.findOne({ user: userId });

    if (!wishList) {
      wishList = new wishModel({
        user: userId,
        userName: user.userName,
        products: [],
      });
    }

    for (let item of products) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }

      const productExists = wishList.products.some(
        (p) => p.productId.toString() === product._id.toString()
      );
      if (productExists) {
        return res.status(409).json({ message: "Product already exists in the wishlist." });
      } else {
        wishList.products.push({
          productId: product._id,
        });
      }
    }

    await wishList.save();

    return res.status(201).json({
      success: true,
      message: "Product(s) added to Wish List successfully.",
      WishList: {
        user: user.userName,
        products: wishList.products,
        _id: wishList._id,
        __v: wishList.__v,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const getWishList = async (req, res) => {
  try {
    const wishList = await wishModel
      .findOne({ user: req.token.userId })
      .populate("products.productId");

    if (!wishList) {
      return res.status(404).json({ message: `Wish List not found` });
    }

    return res.status(200).json({ success: true, wishList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const deleteProductFromWishList = async (req, res) => {
  try {
    const wishList = await wishModel.findOne({ user: req.token.userId });

    if (!wishList) {
      return res.status(404).json({ message: `wish List not found` });
    }

    const deleteProductId = req.params.id;

    const deleteProductIndex = wishList.products.findIndex(
      (Item) => Item.productId.toString() === deleteProductId
    );

    if (deleteProductIndex === -1) {
      return res.status(404).json({
        message: `Product with ID ${deleteProductId} not found in wish List`,
      });
    }

    wishList.products.splice(deleteProductIndex, 1);

    await wishList.save();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      wishList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  addProductToWishList,
  getWishList,
  deleteProductFromWishList,
};
