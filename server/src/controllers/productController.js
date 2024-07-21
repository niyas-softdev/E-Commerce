const router = require("express").Router();
const Product = require("../models/productModel");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products: products,
      message: "Products fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createProduct = async (req, res) => {
  console.log(req.body);
  const product = new Product(req.body);
  console.log(product);

  try {
    await product.save();
    res.status(201).json({
      message: "Product added successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    console.log(req.body);
    console.log("Updated product:", updatedProduct);
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// DELETE a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(201).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
