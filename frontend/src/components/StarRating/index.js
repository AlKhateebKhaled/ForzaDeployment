import React from "react";
import { FloatingLabel } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./style.css";

const StarRating = ({ rating, setRating }) => { 
  const handleClick = (value) => {
    setRating(value); 
  };

  return (
    <FloatingLabel controlId="ratingSelect" className="mb-4 hide-label">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`star ${star <= rating ? "filled selected" : ""}`} 
            onClick={() => handleClick(star)}
            size={30} 
            style={{
              cursor: "pointer",
              color: star <= rating ? "#f9a825" : "#ced4da",
            }} 
          />
        ))}
      </div>
    </FloatingLabel>
  );
};

export default StarRating;
