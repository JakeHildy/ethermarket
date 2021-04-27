const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  creatorId: { type: String, required: [true, "A listing must a creatorId"] },
  posted: { type: Boolean, default: false },
  sold: { type: Boolean, default: false },
  title: { type: String, required: [true, "A listing must have a title"] },
  price: {
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
  images: [{ url: String }],
  followers: [String],
  createdAt: { type: Date, default: Date.now() },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
