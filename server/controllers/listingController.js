const Listing = require("./../models/listingModel");
const express = require("express");

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json({
      status: "success",
      results: listings.length,
      data: { listings },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: "Failed to get listings" });
  }
};

exports.createListing = async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        listing: newListing,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: "Invalid data sent!" });
  }
};
