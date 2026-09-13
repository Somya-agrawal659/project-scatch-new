const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(`${mongodb+srv://Somya:Somya@interview-ai-cluster.6314tk0.mongodb.net/}/scatch`)
  .then(function () {
    dbgr("connected");
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
