require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("./src/config/passport-config");


const mongoose = require("./src/config/db");

const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const authRoute = require("./src/routes/authRoute");

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());


app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true
  })
);


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
