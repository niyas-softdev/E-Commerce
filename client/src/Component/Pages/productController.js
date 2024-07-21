import { Table, Container } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductController() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem("token");
  };
  

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/get", {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleUpdate = (product) => {
    navigate("/productUpdate", { state: product });
  };

  const handleDelete = async (id) => {
    // Optimistically update the UI
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);

    const url = `http://localhost:5000/api/product/delete/${id}`;
    try {
      const res = await axios.delete(url);
      if (res.status === 201) {
        toast.success("Successfully Deleted", { autoClose: 2000 });
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to Delete");
      // Rollback the UI update if the request fails
      setProducts(products);
    }
  };

  return (
    <Container className="py-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image}
                  alt="product"
                  width={40}
                  className="rounded"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td className="d-flex gap-3">
                <MdSystemUpdateAlt
                  onClick={() => handleUpdate(product)}
                  className="text-info fs-3"
                />
                <MdDelete
                  onClick={() => handleDelete(product._id)}
                  className="text-danger fs-3"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
}

export default ProductController;
