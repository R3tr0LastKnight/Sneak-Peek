const { hashPassword, comparePasword } = require("../helpers/authhelper");
const JWT = require("jsonwebtoken");
const userModel = require("../model/userModel");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    // Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please log in.",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(203).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    const user = await userModel.findOne({ email: email });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email is not registered." });
    }

    // Compare passwords
    const isMatch = await comparePasword(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password." });
    }

    // Generate token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in login.", error });
  }
};

const googleregisterController = async (req, res) => {
  const { profile } = req.body;

  if (!profile) {
    return res.status(400).json({ error: "Profile data is required." });
  }

  // Create a new user document and save it to the database
  const newUser = new userModel({
    name: profile.name,
    email: profile.email,
    // Add other relevant properties from the `profile` object
  });

  newUser
    .save()
    .then((user) => {
      res.json({ success: true, user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to store user data." });
    });
};

const googleLoginController = async (req, res) => {
  const { profile } = req.body;
  console.log("Google Login successfully", profile);
  if (!profile) {
    return res.status(400).json({ error: "Profile data is required." });
  }

  userModel
    .findOne({ email: profile.email })
    .then((user) => {
      if (user) {
        console.log("User login successfully");
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "7d",
        });
        res.json({ success: true, user, token });
      } else {
        // User does not exist, send an error response
        res.status(404).json({ error: "User not found." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to find user." });
    });
};

module.exports = {
  registerController,
  loginController,
  googleregisterController,
  googleLoginController,
};
