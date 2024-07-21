const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const {verifyToken, verifyRole} = require("../middleware/auth");


router.get("/get", getUsers);

router.post("/create", verifyToken ,verifyRole(["admin"]), createUser);

router.put("/update/:id", verifyToken ,verifyRole(["admin"]), updateUser); // Note: the ID parameter is required for updating a specific user

router.delete("/delete/:id", verifyToken ,verifyRole(["admin"]), deleteUser); // Note: the ID parameter is required for deleting a specific user

module.exports = router;
