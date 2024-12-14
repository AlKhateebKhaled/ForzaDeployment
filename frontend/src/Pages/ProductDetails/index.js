import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import "./style.css";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";
import { AppContext } from "../../App";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    token,
    setIsLoading,
    inWishlist,
    setInWishlist,
    setError,
    alert,
    setAlert,
    updateCart,
    isDarkMode,
  } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://meraki-academy-project-4-lgda.onrender.com/products/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setProduct(response.data.product);
        } catch (err) {
          console.error(err);
          setError("Error fetching product details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProductDetails();
  }, [id, token, setProduct]);

  useEffect(() => {
    setReviews([]);
    setAverageRating(0);
    const fetchReviews = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const res = await axios.get(`https://meraki-academy-project-4-lgda.onrender.com/reviews/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReviews(res.data.reviews);
          calculateAverageRating(res.data.reviews);
        } catch (err) {
          console.error("Error fetching reviews:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchReviews();
  }, [id, token]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
    } else {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      setAverageRating(totalRating / reviews.length);
    }
  };

  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews, newReview];
      calculateAverageRating(updatedReviews);
      return updatedReviews;
    });
    setShowAddReview(false);
  };

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (id) {
        try {
          await axios.get("https://meraki-academy-project-4-lgda.onrender.com/wishlist", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const isInWishlist =
            localStorage.getItem(`wishlist_${id}`) === "true";
          setInWishlist(isInWishlist);
        } catch (err) {
          console.error("Error fetching wishlist:", err);
        }
      }
    };

    fetchWishlistStatus();
  }, [id, token, setInWishlist]);

  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(
        () => setAlert({ message: "", variant: "" }),
        3000
      );
      return () => clearTimeout(timeout);
    }
  }, [alert, setAlert]);

  const handleAddToWishlist = async () => {
    if (!token) {
      setAlert({
        message: "Please log in to add items to wishlist",
        variant: "danger",
      });
      navigate("/login");
      return;
    }

    try {
      if (!inWishlist) {
        await axios.post(
          "https://meraki-academy-project-4-lgda.onrender.com/wishlist",
          { products: [{ productId: id }] },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInWishlist(true);
        localStorage.setItem(`wishlist_${id}`, true);
        setAlert({
          message: "Product added to wishlist successfully!",
          variant: "success",
        });
      } else {
        await axios.delete(`https://meraki-academy-project-4-lgda.onrender.com/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInWishlist(false);
        localStorage.removeItem(`wishlist_${id}`);
        setAlert({
          message: "Product removed from wishlist successfully!",
          variant: "success",
        });
      }
    } catch (err) {
      setAlert({
        message:
          err.response?.data?.message ||
          "An error occurred while updating wishlist",
        variant: "danger",
      });
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      setAlert({
        message: "Please log in to add items to cart",
        variant: "danger",
      });
      navigate("/login");
      return;
    }

    const addedItem = { productId: id, quantity: 1 };

    try {
      const res = await axios.post(
        "https://meraki-academy-project-4-lgda.onrender.com/cart",
        { products: [addedItem] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlert({
        message: "Product added to cart successfully!",
        variant: "success",
      });
      updateCart(addedItem);
    } catch (err) {
      console.error("Server error:", err.response?.data);
      setAlert({
        message: err.response?.data?.message || "Error adding product to cart",
        variant: "danger",
      });
    }
  };

  return (
    <div
      className={`product-details container mt-5 ${
        isDarkMode ? "dark-mode" : ""
      }`}
      style={{
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
      }}
    >
      <div className="row">
        {product ? (
          <>
            <div className="col-md-6">
              <img
                src={product.imageURL}
                alt={product.team}
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2>{product.team}</h2>
              <p>
                <strong>Season:</strong> {product.Season}
              </p>
              <p>
                <strong>Type:</strong> {product.Type}
              </p>
              <p>
                <strong>Brand:</strong> {product.Brand}
              </p>
              <p>
                <strong>League:</strong> {product.League}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>In Stock:</strong>{" "}
                {product.stock > 0 ? (
                  <span className="text-success">
                    <FaCheckCircle /> Yes
                  </span>
                ) : (
                  <span className="text-danger">
                    <FaTimesCircle /> No
                  </span>
                )}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>

              <p>
                <strong>Average Rating: </strong>
                {averageRating ? (
                  <>
                    {averageRating.toFixed(1)}{" "}
                    <FaStar style={{ color: "#f9a825", fontSize: "1.3em" }} />
                  </>
                ) : (
                  "No Rating Yet"
                )}
              </p>

              <div className="product-details__actions d-flex justify-content-between align-items-center mt-4">
                <button
                  className="product-details__btn AddToCart"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  className={`product-details__btn ${
                    inWishlist
                      ? "ProductDetailswishList__button--remove"
                      : "ProductDetailswishList__button--add"
                  }`}
                  onClick={handleAddToWishlist}
                >
                  <FaHeart />{" "}
                  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
                <button
                  className="product-details__btn back"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
              {alert.message && (
                <Alert variant={alert.variant} className="mt-3">
                  {alert.message}
                </Alert>
              )}

              <div className="reviews mt-5">
                <h3
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowReviews((prev) => !prev)}
                >
                  Reviews ({reviews.length}){" "}
                  {showReviews ? <FaChevronUp /> : <FaChevronDown />}
                </h3>
                {showReviews && (
                  <>
                    <ReviewList reviews={reviews} setReviews={setReviews} />
                    <button
                      className="btn btn-link"
                      onClick={() => setShowAddReview((prev) => !prev)}
                    >
                      {showAddReview ? "Hide Review Form" : "Add a Review"}
                    </button>

                    {showAddReview && (
                      <ReviewForm
                        productId={id}
                        onReviewAdded={handleReviewAdded}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <h3>Loading product details...</h3>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
