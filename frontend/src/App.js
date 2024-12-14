import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";
import LoadingSpinner from "./components/Spinner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm";
const stripePromise = loadStripe(
  "pk_test_51QBo1LEIqIU1iv7H4G4ACPS0CDsW1N0omgyBePmRWkr3Iy4u4mQmExS7EZW4kf5nzgCJtoD59Cx2fnwTBP0mJMM40073HR24al"
);

export const AppContext = createContext();

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [shownProducts, setShownProducts] = useState(151);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [logedinUserId, setLogedinUserId] = useState(
    localStorage.getItem("userId")
  );

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
  const cartCount = cartItems.length;
  const updateCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (i) => i.productId === item.productId
      );
      const newCartItems =
        existingItemIndex !== -1
          ? prevCartItems.map((i, index) =>
              index === existingItemIndex
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          : [...prevCartItems, { ...item, quantity: item.quantity }];

      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        formData,
        setFormData,
        msg,
        setMsg,
        token,
        setToken,
        selectedFilter,
        setSelectedFilter,
        inWishlist,
        setInWishlist,
        userName,
        setUserName,
        isLoading,
        setIsLoading,
        product,
        setProduct,
        error,
        setError,
        alert,
        setAlert,
        shownProducts,
        setShownProducts,
        cartItems,
        setCartItems,
        updateCart,
        cartCount,
        setSearchTerm,
        searchTerm,
        logedinUserId,
        setLogedinUserId,
        totalAmount,
        setTotalAmount,
      }}
    >
      {isLoading && <LoadingSpinner />}

      <RouterProvider router={router} />
     
    </AppContext.Provider>
  );
}

export default App;
