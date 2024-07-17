import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.String,
  },
  dealname: {
    type: mongoose.Schema.Types.String,
  },
  img: {
    type: mongoose.Schema.Types.String,
  },
});

export const Deal = mongoose.model("deals", dealSchema);
