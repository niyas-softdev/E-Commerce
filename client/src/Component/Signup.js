import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhoneno] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const formData = {
    name: name,
    phone: phone,
    avatar: avatar,
    email: email,
    password: password
  };
  console.log(formData, ",.,.,.,");

  const postdata = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/user/signup";
    await axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast("Successfully Register", { type: "success", autoClose: 2000 });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className=" d-flex justify-content-center align-items-center py-5">
      <Form onSubmit={postdata} className=" shadow-lg p-5 rounded-4">
        <h3 className="text-center mb-4">Signup</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phoneno</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone"
            onChange={(e) => setPhoneno(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Avatar Image"
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Form.Group>
        <div className=" d-flex justify-content-center align-items-center">
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default SignUp;
