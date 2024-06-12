const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "E-Commerce"
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));

db.once("open", () => {
  console.log("db connected...");
});

module.exports = db;
