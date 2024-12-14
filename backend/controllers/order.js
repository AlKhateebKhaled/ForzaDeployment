const orderModel = require("../models/orderSchema");
const productModel = require("../models/productSchema");
const userModel = require("../models/userSchema");
const createOrder = async (req, res) => {
  try {
    const { products, shippingInfo } = req.body;
    const userId = req.token.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    let orderProducts = [];
    let totalAmount = 0;

    for (let item of products) {
      const product = await productModel.findById(item.productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      const productTotalPrice = product.price * item.quantity;

      totalAmount += productTotalPrice;

      orderProducts.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        productName: product.team,
      });
    }

    const newOrder = new orderModel({
      user: userId,
      userName: user.userName,
      products: orderProducts,
      totalAmount,
      status: "pending",
      shippingInfo, 
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order: {
        user: user.userName,
        products: orderProducts,
        totalAmount,
        status: newOrder.status,
        _id: newOrder._id,
        __v: newOrder.__v,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.token.userId })
      .populate("user")
      .populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

const getOrderById = async (req, res) => {
  if (req.params.id === "all") {
    try {
      const orders = await orderModel
        .find()
        .populate("user")
        .populate("products.productId");
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving all orders", error });
    }
  } else {
    try {
      const order = await orderModel
        .findById(req.params.id)
        .populate("user")
        .populate("products.productId");
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving order", error });
    }
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({
      success: true,
      message: "Order Updated Successfully",
      order: order,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
