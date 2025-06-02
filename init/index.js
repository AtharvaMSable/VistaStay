// full logic of initialization

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
// firstly we will clean the random data present in database
// after deleting we will insert our data
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "683b2ea002ee484d122aab91",
  }));
  await Listing.insertMany(initData.data);
  //initData - is object in data.js we want key (data)
  console.log("data was initialized");
};

initDB(); // function call
