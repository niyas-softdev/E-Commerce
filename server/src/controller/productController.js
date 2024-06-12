const router = require("express").Router();
const Product = require("../model/productModel");

router.get("/product/get", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products: products,
      message: "Products fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/product/post", async (req, res) => {
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
});

module.exports = router;
