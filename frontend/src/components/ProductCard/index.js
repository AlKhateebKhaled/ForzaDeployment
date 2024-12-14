import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./style.css";
import {
  FaFutbol,
  FaCalendarAlt,
  FaTshirt,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import axios from "axios";

const ProductCard = ({ product }) => {
  const { token, setIsLoading, isDarkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (product) {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `https://meraki-academy-project-4-lgda.onrender.com/reviews/${product._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
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
  }, [product, token]);

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

  const renderStars = () => {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star full-star" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half-star" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty-star" />);
    }

    return stars;
  };

  return (
    <div className={`product-card ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => handleCardClick(product._id)}>
      <div className="product-img-wrapper">
        <img
          src={product.imageURL}
          alt={product.name}
          className="product-img"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="product-info">
          <span className="product-info-icon">
            <FaFutbol />
          </span>
          <span>{product.team}</span>
        </div>
        <div className="product-info">
          <span className="product-info-icon">
            <FaCalendarAlt />
          </span>
          <span>{product.Season}</span>
        </div>
        <div className="product-info">
          <span className="product-info-icon">
            <FaTshirt />
          </span>
          <span>{product.Type}</span>
        </div>
      </div>
      {averageRating ? (
        <div className="rating-stars">
          {renderStars()}
          <span className="rating-text">{averageRating.toFixed(1)} / 5</span>
        </div>
      ) : (
        <span className="rating-text">No Reviews Yet</span>
      )}
    </div>
  );
};

export default ProductCard;
