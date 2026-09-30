const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

require("dotenv").config();

const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGODB_URI or MONGO_URI must be configured");
}

mongoose
  .connect(mongoURI)
  .then(function () {
    dbgr("connected");
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
