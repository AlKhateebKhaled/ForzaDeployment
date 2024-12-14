import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { AppContext } from "../../App";
import Alert from "react-bootstrap/Alert";

const Contact = () => {
  const { token, setIsLoading, isDarkMode } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchData();
  }, [setIsLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://meraki-academy-project-4-lgda.onrender.com/contact",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitStatus({ message: response.data.message, type: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        message: "Failed to submit message. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className={`contact-container ${isDarkMode ? "dark" : ""}`}>
      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you! Please fill out the form below and we’ll get
        back to you as soon as possible.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className={`form-label ${isDarkMode ? "dark" : ""}`}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={`form-label ${isDarkMode ? "dark" : ""}`}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className={`form-label ${isDarkMode ? "dark" : ""}`}>Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button className="submit">Submit</button>
      </form>

      {submitStatus.message && (
        <Alert
          variant={submitStatus.type === "success" ? "success" : "danger"}
          className="mt-3"
        >
          {submitStatus.message}
        </Alert>
      )}
    </div>
  );
};

export default Contact;
