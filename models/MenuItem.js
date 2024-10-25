const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // Array of strings to hold multiple ingredients
    required: true,
  },
  isDrink: {
    type: Boolean,
    default: false, // Default value set to false
  },
  taste: {
    type: String,
    enum: ["sweet", "salty", "spicy", "sour", "bitter"], // Restricts taste options
    required: true,
  },
});

const MenuItem = mongoose.model("MenuItem", menuSchema);
module.exports = MenuItem;
