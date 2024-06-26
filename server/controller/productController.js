const productModel = require("../model/productModel");

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
module.exports = {
  createProductController,
  displayProductController,
  getSpecificProductController,
};
