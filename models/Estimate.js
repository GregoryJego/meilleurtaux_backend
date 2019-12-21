const mongoose = require("mongoose");

const Estimate = mongoose.model("Estimate", {
  fileNumber: { type: Number, required: true },
  type: { type: String, required: true },
  state: { type: String, required: true },
  use: { type: String, required: true },
  situation: { type: String, required: true },
  location: { type: String, required: true },
  propertyAmount: { type: String, required: true },
  worksAmount: { type: String, required: true },
  notaryFees: { type: String, required: true },
  totalBudget: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = Estimate;
