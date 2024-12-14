import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { Form, Button, Alert, FloatingLabel } from "react-bootstrap";
import StarRating from "../StarRating";
import "./style.css";

const ReviewForm = ({ productId, existingReview, onReviewAdded, onCancel }) => {
  const { token } = useContext(AppContext);
  const [rating, setRating] = useState(
    existingReview ? existingReview.rating : 0
  );
  const [comment, setComment] = useState(
    existingReview ? existingReview.comment : ""
  );
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setShowError(false);
    setShowSuccess(false);

    if (rating < 1 || rating > 5 || !comment) {
      setError("Both rating (1-5) and comment are required.");
      setShowError(true);
      return;
    }

    try {
      const response = existingReview
        ? await axios.put(
            `https://meraki-academy-project-4-lgda.onrender.com/reviews/${existingReview._id}`,
            { rating, comment },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        : await axios.post(
            `https://meraki-academy-project-4-lgda.onrender.com/reviews/${productId}/`,
            { rating, comment },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

      setSuccessMessage(
        existingReview
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
      setShowSuccess(true);
      setRating(0);
      setComment("");
      if (onReviewAdded) {
        onReviewAdded(response.data.review);
      }
    } catch (error) {
      setError(error.response.data.message);
      setShowError(true);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-lg review-form mt-4"
    >
      <h4 className="mb-4" style={{ color: "#f9a825" }}>
        {existingReview ? "Edit Your Review" : "Share Your Experience"}
      </h4>

      {showError && (
        <Alert
          variant="danger"
          className={`animate-alert ${showError ? "fade-in" : "fade-out"}`}
        >
          {error}
        </Alert>
      )}
      {showSuccess && (
        <Alert
          variant="success"
          className={`animate-alert ${showSuccess ? "fade-in" : "fade-out"}`}
        >
          {successMessage}
        </Alert>
      )}

      <div className="rating-container">
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <FloatingLabel
        controlId="commentTextarea"
        label="Your Comment"
        className="mb-4"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave your comment here"
          style={{ height: "100px" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="review-textarea"
        />
      </FloatingLabel>

      <Button variant="primary" type="submit" className="w-100 py-2 review-btn">
        {existingReview ? "Update Review" : "Submit Review"}
      </Button>
      {existingReview && (
        <Button
          variant="secondary"
          className="w-100 py-2 mt-2"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
    </Form>
  );
};

export default ReviewForm;
