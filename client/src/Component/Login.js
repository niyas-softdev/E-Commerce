import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formData = { email, password };

  const postdata = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/user/login";
    try {
      const res = await axios.post(url, formData);
      const userData = res?.data?.user;
      localStorage.setItem("userData", JSON.stringify(userData));
      if (res.status === 200) {
        toast("Login Success", { type: "success", autoClose: 2000 });
        window.dispatchEvent(new Event("userUpdate"));
        navigate("/mens");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast(errorMessage, {
        type: "error",
        autoClose: 2000,
        pauseOnHover: true
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Form onSubmit={postdata} className="shadow-lg p-5 rounded-4">
        <h3 className="text-center mb-4">Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
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
