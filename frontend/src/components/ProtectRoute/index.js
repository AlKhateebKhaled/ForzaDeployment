import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import Modal from "../Modal";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext); // Get token from context
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const navigate = useNavigate();

  if (!token) {
    // Show modal if user is not authenticated
    if (!showModal) {
      setShowModal(true);
    }
    const handleClose = () => {
      setShowModal(false);
      navigate("/"); // Redirect to homepage or any fallback route
    };
    return (
      <>
      {showModal && (
        <Modal
          title="Login Required"
          message="You need to log in to access this page."
          onClose={handleClose} // Redirect on close
          onConfirm={() => navigate("/login")} // Redirect to login
        />
      )}
    </>
    );
  }

  return children; // Render children if authenticated
};

export default ProtectedRoute;
