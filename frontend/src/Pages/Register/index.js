import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Spinner from "react-bootstrap/Spinner";
import "./style.css";
import { AppContext } from "../../App";

function Register() {
  const navigate = useNavigate();
  const { formData, setFormData, msg, setMsg } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    setMsg("");
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName) newErrors.userName = "Username is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email format is invalid!";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters!";
    if (!formData.address) newErrors.address = "Address is required!";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowAlert(false);
      return;
    }

    setIsLoading(true);

    axios
      .post("https://meraki-academy-project-4-lgda.onrender.com/users/register", formData)
      .then((res) => {
        console.log("Response:", res.data);
        setShowAlert(true);
        setErrors({});
        setMsg("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setMsg(
          err.response?.data?.message || "An error occurred during registration"
        );
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderTooltip = (props, message) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

  return (
    <div className="register-page">
      <Form onSubmit={handleSubmit}>
        {msg && <Alert variant="danger">{msg}</Alert>}
        {showAlert && (
          <Alert
            className="mt-3"
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Registration successful! Redirecting to login...
          </Alert>
        )}

        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Label className="label-custom">User Name</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, "Enter your full name")}
            >
              <Form.Control
                name="userName"
                placeholder="Enter User Name"
                value={formData.userName}
                onChange={handleChange}
                isInvalid={!!errors.userName}
              />
            </OverlayTrigger>
            <Form.Control.Feedback type="invalid">
              {errors.userName}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Label className="label-custom">Email</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) =>
                renderTooltip(props, "Enter a valid email address")
              }
            >
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
            </OverlayTrigger>
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Label className="label-custom">Password</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) =>
                renderTooltip(props, "Password must be at least 6 characters")
              }
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
            </OverlayTrigger>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Label className="label-custom">Address</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) =>
                renderTooltip(props, "Enter your full address")
              }
            >
              <Form.Control
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
            </OverlayTrigger>
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          "Submit"
        </Button>
        {isLoading && (
          <>
            <Spinner animation="border" size="sm" /> Submitting...
          </>
        )}
      </Form>
    </div>
  );
}

export default Register;
