const router = require("express").Router();
const User = require("../models/userModel"); // Assuming you have a user model defined in the models directory

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users,
      message: "Users fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// CREATE a new user
const createUser = async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  console.log(user);

  try {
    await user.save();
    res.status(201).json({
      message: "User added successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// UPDATE a user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
