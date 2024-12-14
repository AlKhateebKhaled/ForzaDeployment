const express = require("express");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");

const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/", auth, authorization("create_product"), createProduct);

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", auth, authorization("update_product"), updateProduct);
productRouter.delete(
  "/:id",
  auth,
  authorization("delete_product"),
  deleteProduct
);

module.exports = productRouter;
