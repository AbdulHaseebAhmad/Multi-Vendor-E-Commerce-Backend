import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]*$/.test(v);
      },
    },
  },
  name: {
    type: mongoose.Schema.Types.String,
  },
  img: {
    type: mongoose.Schema.Types.String,
  },
  price: {
    type: mongoose.Schema.Types.String,
  },
  description: {
    type: mongoose.Schema.Types.String,
  },
  color: {
    type: mongoose.Schema.Types.String,
  },
  size: {
    type: mongoose.Schema.Types.String,
  },
  brand: {
    type: mongoose.Schema.Types.String,
  },
  quantity: {
    type: mongoose.Schema.Types.String,
  },
  categories: {
    type: mongoose.Schema.Types.String,
  },
  tags: {
    type: mongoose.Schema.Types.String,
  },
  gender: {
    type: mongoose.Schema.Types.String,
  },
  reviews: {
    type: mongoose.Schema.Types.Object,
  },
  productSpecifications: {
    type: mongoose.Schema.Types.Object,
  },
  seller: {
    type: mongoose.Schema.Types.String,
  },
  discountDetails: {
    type: mongoose.Schema.Types.Object,
  },
});

export const Product = mongoose.model("product", productSchema);
