import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";
import PaymentForm from "../../components/PaymentForm";

const Cart = () => {
  const navigate = useNavigate();
  const {
    setAlert,
    setIsLoading,
    setMsg,
    token,
    setShownProducts,
    cartItems,
    setCartItems,
    isLoading,
    totalAmount,
    setTotalAmount,
    userName,
    logedinUserId,
  } = useContext(AppContext);
  const [checkout, setCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
      setShownProducts(JSON.parse(storedCart).length);
      calculateTotalAmount(JSON.parse(storedCart));
    }
  }, [setCartItems, setShownProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://meraki-academy-project-4-lgda.onrender.com/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.cart.products);
        setShownProducts(res.data.cart.products.length);
        calculateTotalAmount(res.data.cart.products);
        localStorage.setItem(
          "cartItems",
          JSON.stringify(res.data.cart.products)
        );
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to fetch cart");
        console.error("err: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token, setMsg, setShownProducts, setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setIsLoading(true);
    axios
      .put(
        `https://meraki-academy-project-4-lgda.onrender.com/cart/${id}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAlert({
          message: "Cart updated successfully!",
          variant: "success",
        });

        const updatedCartItems = cartItems.map((item) =>
          item.productId === id ? { ...item, quantity: newQuantity } : item
        );

        setCartItems(updatedCartItems);
        calculateTotalAmount(updatedCartItems);
      })
      .catch((err) => {
        setAlert({
          message:
            err.response?.data?.message ||
            "An error occurred while updating the cart",
          variant: "danger",
        });
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveFromCart = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://meraki-academy-project-4-lgda.onrender.com/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAlert({
          message: "Product removed from cart successfully!",
          variant: "success",
        });

        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== id
        );

        setCartItems(updatedCartItems);
        calculateTotalAmount(updatedCartItems);
      })
      .catch((err) => {
        setAlert({
          message:
            err.response?.data?.message ||
            "An error occurred while removing from cart",
          variant: "danger",
        });
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangeShippingInfo = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    setCheckout(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData = {
      user: userName,
      userName: logedinUserId,
      products: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        productName: item.productName,
      })),
      totalAmount: totalAmount,
      shippingInfo: shippingInfo,
    };
    console.log(orderData);
    try {
      const response = await axios.post(
        "https://meraki-academy-project-4-lgda.onrender.com/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ type: "success", message: response.data.message });
      console.log(response);

      navigate("/order");
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.message });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Cart container">
      <h2>Shopping Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Item Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item.productId}>
                <td>
                  {item.productName} - {item.productType} - (
                  {item.productSeason})
                </td>
                <td>
                  <div className="quantity-control">
                    <button
                      className="quantity-control__button quantity-control__button--decrease"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-control__button quantity-control__button--increase"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.price ? item.price.toFixed(2) : "0.00"} $</td>
                <td>{(item.price * item.quantity).toFixed(2)} $</td>
                <td>
                  <button
                    className="cart__button cart__button--remove"
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Your cart is empty!</td>
            </tr>
          )}
        </tbody>
      </table>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total Amount: {totalAmount.toFixed(2)} $</h3>
          <button
            className="cart__button cart__button--checkout"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      )}

      {checkout && (
        <>
          <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChangeShippingInfo}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChangeShippingInfo}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChangeShippingInfo}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChangeShippingInfo}
                required
              />
              <button type="submit">Place Order</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
