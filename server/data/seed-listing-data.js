const mongoose = require("mongoose");
const dotenv = require("dotenv");
const faker = require("faker");
const randomHelpers = require("./../utils/randomHelpers");
const { v4: uuidv4 } = require("uuid");
const Listing = require("./../models/ListingModel");
dotenv.config({ path: ".env" });

////////////////////////////////////////
// CONNECT TO DATABASE
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

////////////////////////////////////////
// CREATE FAKE INFORMATION
const listings = [];
for (let i = 0; i < process.argv[3]; i++) {
  const listing = {
    creatorId: uuidv4(),
    posted: true,
    sold: false,
    title: faker.vehicle.vehicle(),
    price: Math.random() * 20,
    listCurrency: randomHelpers.getRandomCurrency(),
    category: randomHelpers.getRandomCategory(),
    condition: randomHelpers.getRandomCondition(),
    location: {
      lat: faker.address.latitude(),
      long: faker.address.longitude(),
    },
    description: faker.lorem.paragraph(),
    images: randomHelpers.getRandomImages(),
    followers: randomHelpers.getRandomFollowerIds(),
  };
  listings.push(listing);
}

////////////////////////////////////////
// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Listing.create(listings);
    console.log("Fake Listings successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

////////////////////////////////////////
// DELETE ALL LISTING DATA FROM DB
const deleteData = async () => {
  try {
    await Listing.deleteMany();
    console.log("Listings successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

////////////////////////////////////////
// RUN SPECIFIC FUNCTIONS BASED ON PROCESS VARS.
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
