import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
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
    src: String,
    id: Number,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
