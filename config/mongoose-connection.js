const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(`${MONGODB_URI}/scatch`)
  .then(function () {
    dbgr("connected");
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
