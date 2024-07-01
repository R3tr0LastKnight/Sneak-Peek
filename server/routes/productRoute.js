const {
  createProductController,
  displayProductController,
  getSpecificProductController,
} = require("../controller/productController");

const router = require("express").Router();
const multer = require("multer");
const memoryStorage = require("multer");
// Ensure the uploads directory exists
// Configure multer to handle file uploads
const storage = memoryStorage();
const upload = multer({ storage: storage });
router.post("/createProduct", createProductController);
router.get("/getProducts", displayProductController);
router.get("/getSpecificProduct/:productId", getSpecificProductController);

module.exports = router;
