const Listing = require("./../models/listingModel");
const express = require("express");
const { query } = require("express");

exports.getAllListings = async (req, res) => {
  try {
    console.log(req.query);

    // BUILD QUERY
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);

    // Add '$' to front of operators so mongoose can use these as filter parameters.
    // gte, gt, lte, lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Listing.find(JSON.parse(queryStr));

    // EXECUTE QUERY
    const listings = await query;

    // SEND RESONSE
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
    res.status(400).json({ status: "fail", message: err });
  }
};

exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json({ status: "success", data: { listing } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: "Failed to get Listing" });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { listing } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: "Failed to get Listing" });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(404).json({ status: "fail", message: "Listing not found" });
  }
};
