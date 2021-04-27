const express = require("express");
const cors = require("cors");
const listingRouter = require("./routes/listingRoutes");

const app = express();

///////////////////////////////////////////
// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

///////////////////////////////////////////
// ROUTES
app.use("/api/v1/listings", listingRouter);

module.exports = app;
