const SneaksAPI = require("sneaks-api");
const mongoose = require("mongoose");

// MongoDB connection details
const MONGO_URI =
  "mongodb+srv://godusoppexe:244466666@drip.j9tjz6f.mongodb.net/?retryWrites=true&w=majority&appName=drip";
const DB_NAME = "sneakpeek";
const COLLECTION_NAME = "drip";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DB_NAME,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  // After connection is established, proceed to fetch and store sneakers
  fetchAndStoreSneakers();
});

// Define schema and model here (as previously shown)

// Example function to fetch and store sneakers
async function fetchAndStoreSneakers() {
  try {
    // Initialize SneaksAPI inside the function scope
    const sneaks = new SneaksAPI();

    // Fetch popular sneakers (example usage)
    const popularSneakers = await sneaks.getMostPopular(10);

    if (!popularSneakers || popularSneakers.length === 0) {
      throw new Error("No sneakers data fetched.");
    }

    // Example: store fetched data into MongoDB
    const SneakerModel = mongoose.model("Sneaker", {
      name: String,
      colorway: String,
      description: String,
      releaseDate: Date,
      retailPrice: Number,
      styleID: String,
      imageLinks: [String],
      productLinks: {
        stockX: String,
        stadiumGoods: String,
        goat: String,
        flightClub: String,
      },
      priceMap: {
        stockX: Map,
        stadiumGoods: Map,
        goat: Map,
        flightClub: Map,
      },
    });

    // Insert fetched sneakers into MongoDB collection
    await SneakerModel.insertMany(popularSneakers);

    console.log("Sneakers inserted into MongoDB");
  } catch (error) {
    console.error("Error fetching or storing sneakers:", error);
  } finally {
    // Optionally close MongoDB connection when done
    mongoose.disconnect();
  }
}
