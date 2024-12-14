const orderModel = require("../models/orderSchema");
const productModel = require("../models/productSchema");
const userModel = require("../models/userSchema");
const cartModel = require("../models/cartSchema");

const addProduct = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.token.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({
        user: userId,
        userName: user.userName,
        products: [],
        totalAmount: 0,
      });
    }
    /*{
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        default: null,
      },
      quantity: { type: Number, required: true, default: null },
      price: { type: Number, required: true },
      productName: { type: String, default: null },
      productType: { type: String, default: null },
      productSeason: { type: String, default: null },
      productTotal: { type: Number, required: true, default: 0 },
    },
  ],
  totalAmount: { type: Number, required: true, default: 0 },
}); */
    for (let item of products) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      const existingProductIndex = cart.products.findIndex(
        (cartItem) => cartItem.productId.toString() === item.productId
      );

      const productTotalPrice = product.price * item.quantity;

      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += item.quantity;
      } else {
        cart.products.push({
          productId: product._id,
          quantity: item.quantity,
          price: product.price,
          productName: product.team,
          productType: product.Type,
          productSeason: product.Season,
          productTotal: product.price * item.quantity,
        });
      }

      cart.totalAmount += productTotalPrice;
    }

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Product(s) added to cart successfully",
      cart: {
        user: user.userName,
        products: cart.products,
        totalAmount: cart.totalAmount,
        _id: cart._id,
        __v: cart.__v,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const updateProductId = req.params.id;
    const userId = req.token.userId;

    if (typeof quantity !== "number" || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: `Cart not found` });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === updateProductId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: `Product not found in cart` });
    }

    cart.products[productIndex].quantity = quantity;

    cart.totalAmount = cart.products.reduce((total, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 0;
      return total + itemPrice * itemQuantity;
    }, 0);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product Quantity Updated Successfully",
      cart: {
        user: user.userName,
        products: cart.products,
        totalAmount: cart.totalAmount,
        _id: cart._id,
        __v: cart.__v,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user: req.token.userId });

    if (!cart) {
      return res.status(404).json({ message: `Cart not found` });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user: req.token.userId });

    if (!cart) {
      return res.status(404).json({ message: `Cart not found` });
    }

    const deleteProductId = req.params.id;

    const deleteProductIndex = cart.products.findIndex(
      (cartItem) => cartItem.productId.toString() === deleteProductId
    );

    if (deleteProductIndex === -1) {
      return res.status(404).json({
        message: `Product with ID ${deleteProductId} not found in cart`,
      });
    }

    cart.products.splice(deleteProductIndex, 1);

    cart.totalAmount = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await cartModel.findOneAndDelete({ user: req.token.userId });

    if (!cart) {
      return res.status(404).json({ message: `Cart not found` });
    }

    return res
      .status(200)
      .json({ success: true, message: "Cart Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  addProduct,
  getCart,
  deleteProductFromCart,
  deleteCart,
  updateCartItemQuantity,
};
