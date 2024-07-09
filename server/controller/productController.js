const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Payment = require("../model/paymentSchema");
const { compare } = require("bcryptjs");
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
    console.log("product", productId);
    const productsDetail = await productModel.findOne({ _id: productId });
    console.log("Product detail", productsDetail);
    res.status(200).json(productsDetail);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

const addProductCartController = async (req, res) => {
  const { products, userId } = req.body;
  console.log("req body cart", req.body);
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
const createRZOrder = async (req, res) => {
  const { amount, currency, userId } = req.body;
  console.log("Rqe", req.body);
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
    console.log("product", orderId);
    const paymentDetail = await Payment.findOne({ razorpayOrderId: orderId });
    console.log("Product detail", paymentDetail);
    res.status(200).json(paymentDetail);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
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
};
