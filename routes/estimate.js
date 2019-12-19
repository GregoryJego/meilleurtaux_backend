const express = require("express");
const router = express.Router();
const Estimate = require("../models/Estimate");

// 1) ROUTE CREATE ********* //

router.post("/estimate/create", async (req, res) => {
  try {
    const {
      type,
      state,
      use,
      situation,
      location,
      propertyAmount,
      worksAmount,
      notaryFees,
      totalBudget,
      email
    } = req.fields;

    const fileNumber = (await Estimate.countDocuments()) + 1;

    const newEstimate = new Estimate({
      fileNumber: fileNumber,
      type,
      state,
      use,
      situation,
      location,
      propertyAmount,
      worksAmount,
      notaryFees,
      totalBudget,
      email
    });
    await newEstimate.save();
    res.json(newEstimate.fileNumber);
  } catch (error) {
    res.status(400).json(error);
  }
});

// 2) ROUTE READ ********* //

router.get("/estimate/", async (req, res) => {
  try {
    //we get all the offers from the query filters (offer)
    const estimates = await Estimate.find();
    // We update the variable "available" if the date is exceeded
    res.json({ count: estimates.length, estimates: estimates });
  } catch (error) {
    // console.log(error);
    res.status(400).json(error.message);
  }
});

module.exports = router;
