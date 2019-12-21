const express = require("express");
const router = express.Router();
const Estimate = require("../models/Estimate");
const mailgun = require("mailgun-js");

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

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

    // FileNumber will be the fileNumber of the last saved estimate + 1
    let fileNumber = 1;
    const lastEstimatedSaved = await Estimate.findOne().sort({
      _id: -1
    });
    if (lastEstimatedSaved) fileNumber = lastEstimatedSaved.fileNumber + 1;

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
    mg.messages().send(
      {
        from: "Meilleurtaux <postmaster@" + DOMAIN + ">",
        to: newEstimate.email,
        subject: "Votre devis Meilleurtaux",
        text:
          "Bonjour," +
          "\n" +
          "veuillez trouver ci-dessous les informations concernant votre devis fait sur le site Meilleurtaux :" +
          "\n\n" +
          "Numéro de dossier : " +
          newEstimate.fileNumber +
          "\n" +
          "Type de bien : " +
          newEstimate.type +
          "\n" +
          "Etat du bien : " +
          newEstimate.state +
          "\n" +
          "Usage du bien : " +
          newEstimate.use +
          "\n" +
          "Localisation du bien : " +
          newEstimate.location +
          " , France" +
          "\n" +
          "Situation actuelle : " +
          newEstimate.situation +
          "\n" +
          "Adresse email : " +
          newEstimate.email +
          "\n" +
          "Montant du bien : " +
          newEstimate.propertyAmount +
          " €" +
          "\n" +
          "Montant des travaux : " +
          newEstimate.worksAmount +
          " €" +
          "\n" +
          "Frais de notaire : " +
          newEstimate.notaryFees +
          " €" +
          "\n" +
          "Budget total : " +
          newEstimate.totalBudget +
          " €" +
          "\n\n" +
          "Bonne journée" +
          "\n\n" +
          "Fait par Grégory JEGO @LeReacteur"
      },
      (error, body) => {
        console.log(body);
      }
    );
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

router.post("/estimate/:id/delete", async (req, res) => {
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
