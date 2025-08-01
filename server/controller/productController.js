const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Payment = require("../model/paymentSchema");
const { compare } = require("bcryptjs");
const wishListModel = require("../model/wishListModel");
const { AsyncLocalStorage } = require("async_hooks");
const quotesModel = require("../model/quotesModel");
const ContactUsModel = require("../model/ContactUsModel");
const uploadBase64ToS3 = require("../utils/uploadBase64ToS3");
const userModel = require("../model/userModel");
dotenv.config();
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const contactUsController = async (req, res) => {
  try {
    const newDoc = new ContactUsModel(req.body); // creates new doc from incoming form data
    await newDoc.save(); // saves to MongoDB
    res.status(201).json(newDoc); // responds with the saved document
  } catch (error) {
    console.error("Error saving document:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
};

const createProductController = async (req, res) => {
  try {
    const {
      brand,
      price,
      companymodel,
      colorway,
      about,
      country,
      photos, // array of base64 strings
    } = req.body;

    let photoUrls = [];

    if (Array.isArray(photos)) {
      const uploads = photos.map((base64) => uploadBase64ToS3(base64));
      photoUrls = await Promise.all(uploads);
    }

    const newProduct = new productModel({
      brand,
      price,
      companymodel,
      photos: photoUrls, // ✅ now storing AWS URLs, not base64
      colorway,
      about,
      country,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const displayProductController = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

const getSpecificProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const productsDetail = await productModel.findOne({ _id: productId });

    res.status(200).json(productsDetail);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

const addProductCartController = async (req, res) => {
  const { products, userId } = req.body;

  try {
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ products, userId });
    } else {
      // Merge existing products with new ones
      cart.products = [...cart.products, ...products];
    }
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductCartController = async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productsWithDetails = await Promise.all(
      cart.products.map(async (item) => {
        const product = await productModel.findById(item.productId);

        return {
          productId: item.productId,
          size: item.size,
          productDetails: product,
        };
      })
    );

    res.status(200).json({ products: productsWithDetails });
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteProductCartController = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Find the cart for the user
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );

    // Save the updated cart
    await cart.save();

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addProductWishListController = async (req, res) => {
  const { products, userId } = req.body;

  try {
    let WishList = await wishListModel.findOne({ userId });
    if (!WishList) {
      WishList = new wishListModel({ products, userId });
    } else {
      WishList.products = [...WishList.products, ...products];
    }
    await WishList.save();
    res.status(200).send(WishList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductWishListController = async (req, res) => {
  const { userId } = req.query;

  try {
    const WishList = await wishListModel.findOne({ userId });
    if (!WishList) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productsWithDetails = await Promise.all(
      WishList.products.map(async (item) => {
        const product = await productModel.findById(item.productId);

        return {
          productId: item.productId,
          productDetails: product,
        };
      })
    );

    res.status(200).json({ products: productsWithDetails });
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteProductWishListController = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Find the cart for the user
    const WishList = await wishListModel.findOne({ userId });

    if (!WishList) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    WishList.products = WishList.products.filter(
      (product) => product.productId !== productId
    );

    // Save the updated cart
    await WishList.save();
    res.status(200).send({ message: "Product removed from wishList" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const createRZOrder = async (req, res) => {
  const { amount, currency, userId } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
    });

    const payment = new Payment({
      userId,
      razorpayOrderId: order.id,
      amount,
      currency,
    });

    await payment.save();

    res.json(order);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
const verifyRZOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } =
    req.body;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "paid",
      }
    );

    res.status(200).json({ success: true, orderId: razorpay_order_id });
  } else {
    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "failed",
      }
    );
    res.status(400).json({ error: "Payment verification failed" });
  }
};

const getPaymentDetailController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const paymentDetail = await Payment.findOne({ razorpayOrderId: orderId });

    res.status(200).json(paymentDetail);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

const productExistCartController = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productExists = cart.products.some(
      (product) => product.productId === productId
    );

    res.status(200).json({ exists: productExists });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
let cachedProduct = null;
let cacheTime = 0;

// Function to fetch and cache a random product
const getRandomProduct = async () => {
  if (!cachedProduct || Date.now() - cacheTime > 24 * 60 * 60 * 1000) {
    // 24 hours in milliseconds
    const count = await productModel.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    cachedProduct = await productModel.findOne().skip(randomIndex);
    cacheTime = Date.now();
  }
  return cachedProduct;
};

const productofTheDayController = async (req, res) => {
  try {
    const product = await getRandomProduct();
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const showCaseProductController = async (req, res) => {
  try {
    const randomProducts = await productModel.aggregate([
      { $sample: { size: 3 } },
    ]);
    res.json(randomProducts);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let chachedQuote = null;
let chachedTime2 = 0;

const getRandomQuotes = async () => {
  if (!chachedQuote || Date.now() - chachedTime2 > 24 * 60 * 60 * 1000) {
    // 24 hours in milliseconds
    const count = await quotesModel.countDocuments();

    if (count === 0) {
      return { quote: "No quotes available" };
    }
    const randomIndex = Math.floor(Math.random() * count);
    chachedQuote = await quotesModel.findOne().skip(randomIndex);
    chachedTime2 = Date.now();
  }
  return chachedQuote || { quote: "No quotes available" };
};

const quotesController = async (req, res) => {
  try {
    const quotes = await getRandomQuotes();

    res.json(quotes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const uploadProfilePicController = async (req, res) => {
  const { userId, base64Image } = req.body;

  if (!userId || !base64Image) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { photoURL: base64Image },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({
      message: "Profile picture updated",
      photoURL: user.photoURL,
      user,
    });
  } catch (error) {
    console.error("Profile pic update failed:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
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
  uploadProfilePicController,
};
