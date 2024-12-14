require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/db");
const userRouter = require("./routes/user");
const roleRouter = require("./routes/role");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
const wishRouter = require("./routes/wishList");
const reviewRouter = require("./routes/review");
const contactRouter = require("./routes/contact");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "https://forzza.netlify.app" }));

app.use(express.json());
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishRouter);
app.use("/reviews", reviewRouter);
app.use("/contact", contactRouter);
app.use("/api", paymentRoutes);
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "No content at this path" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});
app.use("/images", express.static("public/images"));
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
