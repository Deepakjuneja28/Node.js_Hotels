const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/Hotel";

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to db server");
});

db.on("disconnected", () => {
  console.log("disconnected from db server");
});

db.on("error", () => {
  console.log("error in db server");
});

module.exports = db;
