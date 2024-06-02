const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Specify the correct write concern here
      writeConcern: {
        w: "majority",
        wtimeout: 1000,
        j: true,
      },
    });

    console.log(`Database connected successfully at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB connection: ${error}`);
  }
};
module.exports = connectDB;
