const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

module.exports.getRandomCurrency = () => {
  const currencies = ["ETH", "BTC", "ZCASH"];
  const randIndex = Math.floor(Math.random() * currencies.length);
  return currencies[randIndex];
};

module.exports.getRandomCategory = () => {
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

module.exports.getRandomCondition = () => {
  const conditions = ["Brand New", "New", "Lightly Used", "Used", "Worn"];
  const randIndex = Math.floor(Math.random() * conditions.length);
  return conditions[randIndex];
};

module.exports.getRandomImages = () => {
  const images = [];
  const randNum = Math.ceil(Math.random() * 6);
  for (let i = 0; i < randNum; i++) {
    images.push({ url: faker.image.image() });
  }
  return images;
};

module.exports.getRandomFollowerIds = () => {
  const ids = [];
  const randNum = Math.ceil(Math.random() * 6);
  for (let i = 0; i < randNum; i++) {
    ids.push(uuidv4());
  }
  return ids;
};
