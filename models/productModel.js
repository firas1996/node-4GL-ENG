const mongoose = require("mongoose");
const productSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "no name",
  },
  price: Number,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
const Product = mongoose.model("Product", productSChema);
module.exports = Product;
