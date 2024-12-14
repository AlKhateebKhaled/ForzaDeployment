import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./style.css"; 
const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status" className="custom-spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
