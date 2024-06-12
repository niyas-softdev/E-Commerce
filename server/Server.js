const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("./src/config/db");

const userController = require("./src/controller/userController");
const productController = require("./src/controller/productController");

const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:5000", "http://localhost:3000"],
//     credentials: true
//   })
// );

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true
  })
);

app.use(bodyParser.json());
app.use("/", userController);
app.use("/", productController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
