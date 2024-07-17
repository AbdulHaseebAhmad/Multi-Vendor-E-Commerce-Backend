import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  cartItems: {
    type: mongoose.Schema.Types.Array,
  },
  selectedAddress: {
    type: mongoose.Schema.Types.Object,
  },
  selectedPhone: {
    type: mongoose.Schema.Types.String,
  },
  paymentmethod: {
    type: mongoose.Schema.Types.Object,
  },
  totalAmount: {
    type: mongoose.Schema.Types.Number,
  },
  totalItems: {
    type: mongoose.Schema.Types.Number,
  },
  orderstatus:{
    type: mongoose.Schema.Types.String
  },
  seller: {
    type: mongoose.Schema.Types.String
  },
  userId: {
    type: mongoose.Schema.Types.String
  },
  customerid : {
    type: mongoose.Schema.Types.String
  },
});

export const Order = mongoose.model("Orders", productSchema);
