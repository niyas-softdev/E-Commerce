import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductUpdate() {
  const navigate = useNavigate();
  const product = useLocation()?.state;
  console.log(product);

  useEffect(() => {
    if (!product) {
      toast.error("No product data found");
      navigate("/productController");
    }
  }, [product, navigate]);

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.image || "");


  const getToken = () => {
    return localStorage.getItem("token");
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = product._id;
    const formData = { name, price, description, image };
    console.log(formData);

    

    const url = `http://localhost:5000/api/product/update/${id}`;
    try {
      const res = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log("res data",res.data);
      if (res.status === 200) {
        toast.success("Successfully Updated", { autoClose: 2000 });
        navigate("/productController");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.error(`Server responded with status ${err.response.status}`, err.response.data);
        toast.error(`Update failed: ${err.response.data.message || "Server Error"}`);
      } else if (err.request) {
        console.error("No response received from server", err.request);
        toast.error("Update failed: No response from server");
      } else {
        console.error("Error setting up the request", err.message);
        toast.error("Update failed: Request setup error");
      }
    }
  };

  const handleGoToHome = () => {
    navigate("/productController");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Form className="shadow-lg p-5 rounded-4" onSubmit={handleUpdate}>
        <h3 className="text-center mb-4">Update Product</h3>
        <h5 className="text-center mb-4">Product ID: {product?._id}</h5>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image URL"
            onChange={(e) => setImage(e.target.value)}
            value={image}
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

export default ProductUpdate;
