const mongoose = require("mongoose");

// Define the schema with validations and constraints
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  role:{
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user"  // Default role is "user" unless specified otherwise in the request body.
   
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },
  cart: {
    type: Array,
    default: []
  }

}, {
  timestamps: true
});

// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
