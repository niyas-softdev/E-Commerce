const express = require("express");
const router = express.Router();

const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const {verifyToken, verifyRole} = require("../middleware/auth");

router.get("/get", verifyToken ,verifyRole(["admin"]), getProduct);

router.post("/create",verifyToken ,verifyRole(["admin"]), createProduct);

router.put("/update/:id", verifyToken ,verifyRole(["admin"]),updateProduct);

router.delete("/delete/:id",verifyToken ,verifyRole(["admin"]), deleteProduct);

module.exports = router;
