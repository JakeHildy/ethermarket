const mongoose = require("mongoose");
const dotenv = require("dotenv");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const Listing = require("./../models/ListingModel");
dotenv.config({ path: ".env" });

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

// CREATE FAKE INFORMATION
const getRandomCurrency = () => {
  const currencies = ["ETH", "BTC", "ZCASH"];
  const randIndex = Math.floor(Math.random() * currencies.length);
  return currencies[randIndex];
};
const getRandomCategory = () => {
  const categories = [
    "Home & Garden",
    "Clothing & Accessories",
    "Electronics",
    "Hobbies",
    "Entertainment",
    "Sporting Goods",
  ];
  const randIndex = Math.floor(Math.random() * categories.length);
  return categories[randIndex];
};
const getRandomCondition = () => {
  const conditions = ["Brand New", "New", "Lightly Used", "Used", "Worn"];
  const randIndex = Math.floor(Math.random() * conditions.length);
  return conditions[randIndex];
};

const getRandomImages = () => {
  const images = [];
  const randNum = Math.ceil(Math.random() * 6);
  for (let i = 0; i < randNum; i++) {
    images.push({ url: faker.image.image() });
  }
  return images;
};

const getRandomFollowerIds = () => {
  const ids = [];
  const randNum = Math.ceil(Math.random() * 6);
  for (let i = 0; i < randNum; i++) {
    ids.push(uuidv4());
  }
  return ids;
};

const listings = [];
for (let i = 0; i < process.argv[3]; i++) {
  const listing = {
    creatorId: uuidv4(),
    posted: true,
    sold: false,
    title: faker.vehicle.vehicle(),
    price: Math.random() * 20,
    listCurrency: getRandomCurrency(),
    category: getRandomCategory(),
    condition: getRandomCondition(),
    location: {
      lat: faker.address.latitude(),
      long: faker.address.longitude(),
    },
    description: faker.lorem.paragraph(),
    images: getRandomImages(),
    followers: getRandomFollowerIds(),
  };
  listings.push(listing);
}

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

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
