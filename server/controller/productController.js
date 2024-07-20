const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Payment = require("../model/paymentSchema");
const { compare } = require("bcryptjs");
const wishListModel = require("../model/wishListModel");
const { AsyncLocalStorage } = require("async_hooks");
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createProductController = async (req, res) => {
  try {
    const { brand, price, companymodel, photos, colorway, about, country } =
      req.body;
    const newProduct = new productModel({
      brand,
      price,
      companymodel,
      photos,
      colorway,
      about,
      country,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
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
};
