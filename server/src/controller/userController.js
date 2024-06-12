const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

router.post("/user/signup", async (req, res) => {
  console.log(req.body.name);
  try {
    const { name, avatar, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = new User({
      name,
      phone,
      avatar,
      email,
      password: hashedPassword
    });
    await data.save();
    return res.status(201).json({ message: "Successfully Signup" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("frontend login data", req.body);

  const user = await User.findOne({ email });
  console.log("user data", user);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  console.log("valid password", validPassword);

  if (!validPassword) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const userData = {
    id: user._id,
    name: user.name,
    avatar: user.avatar,
    email: user.email
  };

  return res
    .status(200)
    .json({ message: "Successfully logged in", user: userData });
});

module.exports = router;
