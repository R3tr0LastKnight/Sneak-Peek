const express = require("express");
const { response } = express;
const dotenv = require("dotenv");
const connectDB = require("../database/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const authRoute = require("../routes/authRoute.js");
dotenv.config();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();
app.use("/api/v1/auth", authRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
