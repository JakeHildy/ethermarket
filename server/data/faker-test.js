const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

// console.log(faker.vehicle.vehicle());
// console.log(Math.random() * 20);
// console.log(faker.address.latitude());
// console.log(faker.address.longitude());
// console.log(faker.image.image());
// console.log(Math.ceil(Math.random() * 6));

// const getRandomImages = () => {
//   const images = [];
//   const randNum = Math.ceil(Math.random() * 6);
//   for (let i = 0; i < randNum; i++) {
//     images.push(faker.image.image());
//   }
//   return images;
// };
// console.log(getRandomImages());

const getRandomFollowerIds = () => {
  const ids = [];
  const randNum = Math.ceil(Math.random() * 6);
  for (let i = 0; i < randNum; i++) {
    ids.push(uuidv4());
  }
  return ids;
};
console.log(getRandomFollowerIds());
