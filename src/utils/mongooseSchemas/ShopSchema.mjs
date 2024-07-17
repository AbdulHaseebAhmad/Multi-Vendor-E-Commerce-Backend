import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  shopname: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  phone: {
    type:mongoose.Schema.Types.String
  },
  shoplogo: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  brands: {
    type: mongoose.Schema.Types.Array,
  },
  shopId: {
    type: mongoose.Schema.Types.Number,
  },
  totalorders: {
    type: mongoose.Schema.Types.Number,
  },
  pendingorders: {
    type: mongoose.Schema.Types.Number,
  },
  completedorders: {
    type: mongoose.Schema.Types.Number,
  },
});

export const Shop = mongoose.model("Shops", shopSchema);
