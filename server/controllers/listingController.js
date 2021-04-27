const Listing = require("./../models/listingModel");
const express = require("express");
const { query } = require("express");

exports.aliasRecentSix = (req, _res, next) => {
  req.query.limit = "6";
  req.query.sort = "createdAt";
  req.query.fields = "createdAt,title,price,images";
  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    // page=2&limit=10 ==> 1-10 -> page 1, 11-20 -> page 2, etc...
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.getAllListings = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Listing.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const listings = await features.query;

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
