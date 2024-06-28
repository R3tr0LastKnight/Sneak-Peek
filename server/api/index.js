const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../database/db.js");
const cors = require("cors");
const app = express();
const path = require("path");
const authRoute = require("../routes/authRoute.js");
const productRoute = require("../routes/productRoute.js");
const bodyParser = require("body-parser");
dotenv.config();
app.use(cors());
const port = process.env.PORT || 5000;
connectDB();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
