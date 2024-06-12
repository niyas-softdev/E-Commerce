import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItems = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState('');

  const formData ={
    name,
    description,
    price,
    category,
    stock,
    image,
  };
  console.log(formData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, description, price, category, stock, image });

    const url = "http://localhost:5000/product/post";
    await axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast("Data Added", { type: "success", autoClose: 2000 });
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className=' d-flex justify-content-center align-items-center m-3'>
    <Form onSubmit={handleSubmit} className=" shadow-lg p-5 rounded-4">
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStock">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer/>
    </Container>
  );
};

export default AddItems;
