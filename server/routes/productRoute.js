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
  productExistCartController,
  addProductWishListController,
  getProductWishListController,
  deleteProductWishListController,
  productofTheDayController,
  showCaseProductController,
  quotesController,
  contactUsController,
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
router.post("/addtoWishList", addProductWishListController);
router.get("/displayWishListProduct", getProductWishListController);
router.delete("/deleteWishListProduct", deleteProductWishListController);
router.post("/createRzOrder", createRZOrder);
router.post("/verifyPayment", verifyRZOrder);
router.get("/getPaymentDetail/:orderId", getPaymentDetailController);
router.get("/check-product/:userId/:productId", productExistCartController);
router.get("/productofTheDay", productofTheDayController);
router.get("/showCaseProduct", showCaseProductController);
router.get("/getQuotes", quotesController);
router.post("/contact", contactUsController);
module.exports = router;
