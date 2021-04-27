const express = require("express");
const listingController = require("../controllers/listingController");

const router = express.Router();

router
  .route("/")
  .get(listingController.getAllListings)
  .post(listingController.createListing);

module.exports = router;
