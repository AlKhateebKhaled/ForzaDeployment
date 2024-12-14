import React, { useContext, useState } from "react";
import { Card, ListGroup, Badge, Button } from "react-bootstrap";
import { FaUserAlt, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./style.css";
import { AppContext } from "../../App";
import ReviewForm from "../ReviewForm";

const ReviewList = ({ reviews, setReviews }) => {
  const { logedinUserId, token } = useContext(AppContext);
  const [editReviewId, setEditReviewId] = useState(null);

  console.log("userId:", logedinUserId);
  console.log("Reviews:", reviews);

  const handleEditClick = (review) => {
    setEditReviewId(review._id);
  };

  const handleEditCancel = () => {
    setEditReviewId(null);
  };

  const handleEdit = async (reviewId) => {
    const updatedReview = {
      rating: 4,
      comment: "This is an updated comment",
    };

    try {
      const response = await axios.put(
        `https://meraki-academy-project-4-lgda.onrender.com/reviews/${reviewId}`,
        updatedReview,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? response.data.review : review
          )
        );
        console.log("Review updated:", response.data.review);
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.delete(
        `https://meraki-academy-project-4-lgda.onrender.com/reviews/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        console.log("Review deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <Card className="mt-5 shadow-sm review-list-card">
      <Card.Header className="text-center">
        <h4 className="mb-0">Customer Reviews</h4>
      </Card.Header>
      <ListGroup variant="flush">
        {reviews.length === 0 ? (
          <ListGroup.Item className="text-center text-muted py-4">
            No reviews yet.
          </ListGroup.Item>
        ) : (
          reviews.map((review) => (
            <ListGroup.Item
              key={review._id}
              className="d-flex justify-content-between align-items-start flex-column"
            >
              {editReviewId === review._id ? (
                <ReviewForm
                  productId={review.productId}
                  existingReview={review}
                  onReviewAdded={(updatedReview) => {
                    setReviews((prevReviews) =>
                      prevReviews.map((r) =>
                        r._id === updatedReview._id ? updatedReview : r
                      )
                    );
                    handleEditCancel();
                  }}
                />
              ) : (
                <>
                  <div className="d-flex justify-content-between w-100">
                    <div className="review-content">
                      <strong>{review.userName}</strong>
                      <br />
                      <strong className="text-secondary">Rating:</strong>
                      <Badge bg="warning" className="ms-2">
                        {review.rating} / 5
                      </Badge>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                    <div className="review-avatar ms-3">
                      <FaUserAlt
                        size={50}
                        className="rounded-circle"
                        style={{ color: "#f9a825" }}
                      />
                    </div>
                  </div>
                  {review.userId === logedinUserId && (
                    <div className="d-flex justify-content-end w-100 mt-3 review-actions">
                      <Button
                        variant="outline-primary"
                        className="me-2 action-btn"
                        onClick={() => handleEditClick(review)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="action-btn"
                        onClick={() => handleDelete(review._id)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </div>
                  )}
                </>
              )}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default ReviewList;
