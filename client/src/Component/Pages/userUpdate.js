import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserUpdate() {
  const navigate = useNavigate();
  const user = useLocation()?.state;
  console.log(user);

  useEffect(() => {
    if (!user) {
      toast.error("No user data found");
      navigate("/userController");
    }
  }, [user, navigate]);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = user._id;
    const formData = { name, phone, avatar };
    
    const getToken = () => {
      return localStorage.getItem("token");
    };

    const url = `http://localhost:5000/api/user/update/${id}`;
    try {
      const res = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.status === 200) {
        toast.success("Successfully Updated", { autoClose: 2000 });
        navigate("/userController");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const handleGoToHome = () => {
    navigate("/userController");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Form className="shadow-lg p-5 rounded-4" onSubmit={handleUpdate}>
        <h3 className="text-center mb-4">Update User</h3>
        <h5 className="text-center mb-4">User ID: {user?._id}</h5>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Avatar Image"
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
          />
        </Form.Group>
        <div className="d-flex gap-5">
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button onClick={handleGoToHome} variant="secondary" type="button">
            Back
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default UserUpdate;
