const mongoose = require("mongoose");

//Db Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  avatar: String,
  email: String,
  password: String
});
const User = mongoose.model("user", userSchema);
module.exports = User;
