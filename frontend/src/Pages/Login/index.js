import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "./style.css";
import { AppContext } from "../../App";

function Login() {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const {
    formData,
    setFormData,
    msg,
    setMsg,
    setToken,
    setUserName,
    logedinUserId,
    setLogedinUserId,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    setMsg("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("https://meraki-academy-project-4-lgda.onrender.com/users/login", formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        localStorage.setItem("userName", res.data.user.userName);
        setUserName(res.data.user.userName);
        localStorage.setItem("userId", res.data.user.userId);
        setLogedinUserId(res.data.user.userId);
        console.log("userId", res.data.user.userId);
        const redirectPath = currentLocation.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch((err) => {
        setMsg(err.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <Form onSubmit={handleLogin} className="form-container">
        {msg && <Alert variant="danger">{msg}</Alert>}

        <h2 className="text-center">Login to Your Account</h2>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="emailHelp"
            />
            <Form.Text id="emailHelp" muted>
              We'll never share your email with anyone else.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type="submit"
              className="w-100"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              variant="outline-primary"
              onClick={handleRegister}
              className="w-100 register-button"
            >
              Don't have an account? Register here
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
