const {
  createProductController,
  displayProductController,
  getSpecificProductController,
  addProductCartController,
  getProductCartController,
  deleteProductCartController,
  createRZOrder,
  verifyRZOrder,
  getPaymentDetailController,
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
router.post("/addtoCart", addProductCartController);
router.get("/displayCartProduct", getProductCartController);
router.delete("/deleteCartProduct", deleteProductCartController);
router.post("/createRzOrder", createRZOrder);
router.post("/verifyPayment", verifyRZOrder);
router.get("/getPaymentDetail/:orderId", getPaymentDetailController);
module.exports = router;
