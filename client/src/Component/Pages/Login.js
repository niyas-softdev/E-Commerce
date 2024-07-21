import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = { email, password };
    const url = "http://localhost:5000/api/auth/signIn";

    axios.post(url, formData)
      .then(res => {
        console.log("Response:", res); // Debug log to check the response
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          toast.success("Login Success", { autoClose: 2000 });
          navigate("/mens");
        } else {
          toast.error("Unexpected response status", { autoClose: 2000 });
        }
      })
      .catch(err => {
        console.error("Error:", err); // Debug log to check the error
        const errorMessage = err.response?.data?.message || "An error occurred";
        toast.error(errorMessage, {
          autoClose: 2000,
          pauseOnHover: true,
        });
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Form onSubmit={handleLogin} className="shadow-lg p-5 rounded-4">
        <h3 className="text-center mb-4">Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default Login;
