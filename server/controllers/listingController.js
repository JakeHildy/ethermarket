const Listing = require("./../models/listingModel");
const express = require("express");
const { query } = require("express");

exports.aliasRecentSix = (req, _res, next) => {
  req.query.limit = "6";
  req.query.sort = "createdAt";
  req.query.fields = "createdAt,title,price,images";
  next();
};

exports.getAllListings = async (req, res) => {
  try {
    console.log(req.query);

    // BUILD QUERY
    // 1a) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1b) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);

    // Add '$' in front of operators so mongoose can use these as filter parameters.
    // gte, gt, lte, lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Listing.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 3) Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4) Pagination
    // page=2&limit=10 ==> 1-10 -> page 1, 11-20 -> page 2, etc...
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // check if page is out of data range:
    if (req.query.page) {
      const numListings = await Listing.countDocuments();
      if (skip >= numListings) throw new Error("this page does not exist");
    }

    // EXECUTE QUERY
    const listings = await query;

    // SEND RESONSE
    res.status(200).json({
      status: "success",
      results: listings.length,
      data: { listings },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
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
