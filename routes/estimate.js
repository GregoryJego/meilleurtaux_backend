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

// 2) ROUTE READ ALL ********* //

router.get("/estimate/", async (req, res) => {
  try {
    //we search all the estimates
    const estimates = await Estimate.find();
    // we send the results
    res.json({ count: estimates.length, estimates: estimates });
  } catch (error) {
    // console.log(error);
    res.status(400).json(error.message);
  }
});

// 3) ROUTE READ ONE ********* //

router.get("/estimate/:id", async (req, res) => {
  try {
    //we search the estimate by its id
    const estimate = await Estimate.findById(req.params.id);
    // we send the result
    res.json({ estimate: estimate });
  } catch (error) {
    // console.log(error);
    res.status(400).json(error.message);
  }
});

// 4) ROUTE DELETE ONE ********* //

router.get("/estimate/:id/delete", async (req, res) => {
  try {
    //we search the estimate by its id and delete it if we find it
    const estimate = await Estimate.deleteOne({ _id: req.params.id });
    // we send a success message
    res.json({ message: "Le devis a bien été supprimé" });
  } catch (error) {
    // console.log(error);
    res.status(400).json(error.message);
  }
});

module.exports = router;
