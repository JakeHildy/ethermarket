const Listing = require("./../models/listingModel");
const express = require("express");

exports.getAllListings = async (req, res) => {
  res.status(200).json({ message: "Get All Listings EP" });
};
