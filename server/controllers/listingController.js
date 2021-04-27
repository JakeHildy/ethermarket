const Listing = require("./../models/listingModel");
const express = require("express");

exports.getAllListings = async (req, res) => {
  res.status(200).json({ message: "Get All Listings EP" });
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
