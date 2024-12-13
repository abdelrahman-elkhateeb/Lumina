const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

app.use(express.json()); // Middleware for JSON parsing

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
