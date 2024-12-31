import React, { useState } from "react";

const Modal = ({ title, message, onClose, onConfirm }) => {
  const [hover, setHover] = useState({ cancel: false, confirm: false });

  const buttonStyles = (type) => ({
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    backgroundColor: type === "confirm" ? (hover.confirm ? "#e64a19 " : "#f9a825") : hover.cancel ? "#b3b3b3" : "#ccc",
    color: type === "confirm" ? "#fff" : "#000",
    transition: "background-color 0.3s ease",
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>{title}</h2>
        <p style={{ marginBottom: "20px", fontSize: "1rem" }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            style={buttonStyles("cancel")}
            onClick={onClose}
            onMouseEnter={() => setHover({ ...hover, cancel: true })}
            onMouseLeave={() => setHover({ ...hover, cancel: false })}
          >
            Cancel
          </button>
          <button
            style={buttonStyles("confirm")}
            onClick={onConfirm}
            onMouseEnter={() => setHover({ ...hover, confirm: true })}
            onMouseLeave={() => setHover({ ...hover, confirm: false })}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
