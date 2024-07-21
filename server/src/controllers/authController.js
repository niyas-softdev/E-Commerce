const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Signup route
const signUp = async (req, res) => {
  try {
    const { name, avatar, phone, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      avatar,
      phone,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "Successfully signed up" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Login route
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is valid
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create and assign a token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.userRole,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Prepare user data to send back
    const userData = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    };

    return res.status(200).json({
      message: "Successfully logged in",
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
