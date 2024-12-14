import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";

const WishList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const {
    setAlert,
    setIsLoading,
    setMsg,
    token,
    shownProducts,
    setShownProducts,
    setInWishlist,
    isDarkMode,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://meraki-academy-project-4-lgda.onrender.com/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.wishList.products);
        setShownProducts(res.data.wishList.products.length);
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to fetch wishlist");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token, setMsg, shownProducts]);

  const handleRemoveFromWishlist = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://meraki-academy-project-4-lgda.onrender.com/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInWishlist(false);
        localStorage.removeItem(`wishlist_${id}`);
        setAlert({
          message: "Product removed from wishlist successfully!",
          variant: "success",
        });
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.filter(
            (product) => product.productId._id !== id
          );
          setShownProducts(updatedProducts.length);
          return updatedProducts;
        });
      })
      .catch((err) => {
        setAlert({
          message:
            err.response?.data?.message ||
            "An error occurred while removing from wishlist",
          variant: "danger",
        });
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnClick = (id) => {
    navigate(`/products/${id}`);
  };

  const styles = {
    container: {
      backgroundColor: isDarkMode ? "#333" : "#f9f9f9",
      color: isDarkMode ? "#fff" : "#333",
      padding: "20px",
      borderRadius: "8px",
    },
    title: {
      fontSize: "24px",
      marginBottom: "10px",
      color: isDarkMode ? "#fff" : "#333", 
    },
    count: {
      fontSize: "16px",
      marginBottom: "20px",
      color: isDarkMode ? "#fff" : "#333", 
    },
    productCard: {
      border: isDarkMode ? "1px solid #444" : "1px solid #ccc",
      borderRadius: "8px",
      overflow: "hidden",
      transition: "transform 0.2s",
    },
    productImg: {
      width: "100%",
      height: "auto",
    },
    cardBody: {
      padding: "15px",
    },
    team: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "5px",
      color: isDarkMode ? "#ffd700" : "#333", 
    },
    type: {
      fontSize: "14px",
      marginBottom: "5px",
      color: isDarkMode ? "#bbb" : "#555",
    },
    season: {
      fontSize: "14px",
      marginBottom: "10px",
      color: isDarkMode ? "#bbb" : "#555",
    },
    price: {
      fontSize: "16px",
      fontWeight: "bold",
      marginTop: "10px",
      color: isDarkMode ? "#ffd700" : "#333", 
    },
    button: {
      marginTop: "10px",
    },
  };

  return (
    <div className="wishlist container" style={styles.container}>
      <h2 className="wishlist__title" style={styles.title}>
        WishList
      </h2>
      <div>
        <h6 className="wishlist__count" style={styles.count}>
          Shown {shownProducts} Kits
        </h6>
      </div>
      <div className="wishlist__products row">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="wishlist__product col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <div
                className="wishlist__product-card card"
                style={styles.productCard}
              >
                <div
                  className="wishlist__product-img-wrapper"
                  onClick={() => handleOnClick(product.productId._id)}
                >
                  <img
                    src={product.productId.imageURL}
                    className="wishlist__product-img"
                    alt={product.productId.team}
                    style={styles.productImg}
                  />
                </div>
                <div
                  className="wishlist__card-body card-body"
                  style={styles.cardBody}
                >
                  <h5
                    className="wishlist__card-title card-title"
                    style={styles.team}
                  >
                    {product.productId.team}
                  </h5>
                  <p
                    className="wishlist__card-text card-text"
                    style={styles.season}
                  >
                    {product.productId.Season}
                  </p>
                  <p
                    className="wishlist__card-text card-text"
                    style={styles.type}
                  >
                    {product.productId.Type}
                  </p>
                  <p className="wishlist__price" style={styles.price}>
                    Price: ${product.productId.price}
                  </p>
                </div>
                <div className="wishlist__product-buttons">
                  <div className="wishlist__remove-btn removeBtn">
                    <button
                      className="btn btn-danger"
                      style={styles.button}
                      onClick={() =>
                        handleRemoveFromWishlist(product.productId._id)
                      }
                    >
                      Remove from WishList
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
