const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

dotenv.config({ path: ".env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const listingSchema = new mongoose.Schema({
  creatorId: { type: String, required: [true, "A listing must a creatorId"] },
  posted: { type: Boolean, default: false },
  sold: { type: Boolean, default: false },
  title: { type: String, required: [true, "A listing must have a title"] },
  listPrice: {
    type: Number,
    required: [true, "A listing must have a list price"],
  },
  listCurrency: { type: String, default: "ETH" },
  category: {
    type: String,
    required: [true, "A listing must have a category"],
  },
  condition: { type: String, default: "Not Specified" },
  location: { lat: String, long: String },
  description: {
    type: String,
    required: [true, "A listing must have a description"],
  },
  images: [{ id: String, url: String }],
  followers: [String],
});

const Listing = mongoose.model("Listing", listingSchema);

const testListing = new Listing({
  creatorId: uuidv4(),
  posted: false,
  sold: false,
  title: "New Amazing Mountain Bike!",
  listPrice: 1.234,
  listCurrency: "ETH",
  category: "Sporting Goods",
  condition: "Lightly Used",
  location: { lat: "41.40338", long: "2.17403" },
  description: "2017 Specialized Stump Jumper",
  images: [
    { id: "09a8s7df9as8df7asdf", url: "localhost:8080/images/mtb-1.jpg" },
    { id: "09a8s7df9asadsgssdf", url: "localhost:8080/images/mtb-sick.jpg" },
  ],
  followers: [
    "098a7sfd9ssdfas7a0s98df7",
    "d2ya7sfd9ssdfas7a0s98df7",
    "afashapjkhljkh9werw76987",
  ],
});

testListing
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("💣 === ERROR ===  💣", err);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App Listening On port ${PORT}`));
