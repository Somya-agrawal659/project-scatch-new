const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const productModel = require("../models/product-model");

require("dotenv").config();

const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

const bags = [
  { image: "1bag.png", name: "Luna Shoulder Bag", price: 12999, discount: 2000, available: true, bgcolor: "#f2e6d8", panelcolor: "#ead8c5", textcolor: "#241b16" },
  { image: "2bag.png", name: "Noir Carryall", price: 15999, discount: 2500, available: true, bgcolor: "#e7e1dc", panelcolor: "#d8cec4", textcolor: "#241b16" },
  { image: "3bag 1.png", name: "Cleo Mini Tote", price: 8999, discount: 0, available: true, bgcolor: "#f3dfcf", panelcolor: "#ecd0bb", textcolor: "#241b16" },
  { image: "4bag.png", name: "Sienna Bucket Bag", price: 11499, discount: 0, available: true, bgcolor: "#ead9c9", panelcolor: "#dfc5ae", textcolor: "#241b16" },
  { image: "5bag.png", name: "Aster Handbag", price: 13999, discount: 0, available: true, bgcolor: "#e4e0d8", panelcolor: "#d6d0c4", textcolor: "#241b16" },
  { image: "6bag.png", name: "Mira Crossbody", price: 9999, discount: 0, available: true, bgcolor: "#efe1d2", panelcolor: "#e5cfba", textcolor: "#241b16" },
  { image: "7bag.png", name: "Elara Top Handle", price: 17999, discount: 3000, available: true, bgcolor: "#e6d8cc", panelcolor: "#d9c1ad", textcolor: "#241b16" },
  { image: "image 80.png", name: "Orla Evening Bag", price: 7499, discount: 0, available: true, bgcolor: "#eee5dc", panelcolor: "#e2d5c7", textcolor: "#241b16" },
  { image: "3bag 1.png", name: "Cleo Mini Tote in Rose", price: 9499, discount: 0, available: true, bgcolor: "#f1d6d0", panelcolor: "#e7c0b8", textcolor: "#241b16" },
  { image: "4bag.png", name: "Sienna Bucket Bag in Mocha", price: 12499, discount: 1500, available: true, bgcolor: "#e4d1c0", panelcolor: "#d6bba4", textcolor: "#241b16" },
  { image: "5bag.png", name: "Aster Handbag in Pearl", price: 14999, discount: 0, available: true, bgcolor: "#e8e7e2", panelcolor: "#d8d7d0", textcolor: "#241b16" },
  { image: "6bag.png", name: "Mira Crossbody in Olive", price: 10499, discount: 1000, available: true, bgcolor: "#dfe3d5", panelcolor: "#cbd3bc", textcolor: "#241b16" },
];

async function seedBags() {
  if (!mongoURI) throw new Error("MONGODB_URI or MONGO_URI must be configured");

  await mongoose.connect(mongoURI);

  for (const bag of bags) {
    const imagePath = path.join(__dirname, "..", "public", "images", bag.image);
    await productModel.findOneAndUpdate({ name: bag.name }, {
      ...bag,
      image: fs.readFileSync(imagePath),
    }, { upsert: true, new: true, setDefaultsOnInsert: true });
  }

  await mongoose.disconnect();
}

seedBags().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});