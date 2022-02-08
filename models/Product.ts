import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 8,
    required: true,
  },
  description: {
    type: String,
    minlength: 20,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
});

module.exports = mongoose.model("Product", productSchema);
