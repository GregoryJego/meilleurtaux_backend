const mongoose = require("mongoose");

const Estimate = mongoose.model("Estimate", {
  fileNumber: { type: Number, required: true },
  type: { type: String, required: true },
  state: { type: String, required: true },
  use: { type: String, required: true },
  situation: { type: String, required: true },
  location: { type: String, required: true },
  propertyAmount: { type: Number, required: true },
  worksAmount: { type: Number, required: true },
  notaryFees: { type: Number, required: true },
  totalBudget: { type: Number, required: true },
  email: { type: String, required: true }
});

module.exports = Estimate;
