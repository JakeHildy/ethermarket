const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();

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
  location: { lat: String, long: String },
  description: {
    type: String,
    required: [true, "A listing must have a description"],
  },
  images: [{ id: String, url: String }],
  followers: [String],
});

const Listing = mongoose.model("Listing", listingSchema);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App Listening On port ${PORT}`));
