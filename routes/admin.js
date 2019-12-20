const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const Admin = require("../models/Admin");

// 1) ROUTE SIGN-UP ********* //

router.post("/admin/create", async (req, res) => {
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.fields.password + salt).toString(encBase64);

  try {
    const newAdmin = await new Admin({
      salt: salt,
      hash: hash,
      token: token
    });

    await newAdmin.save();
    res.json({
      _id: newAdmin._id,
      token: newAdmin.token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2) ROUTE LOGIN ********* //

router.post("/admin/login", async (req, res) => {
  const findAdmin = await Admin.findOne()
    .select("+hash")
    .select("+salt")
    .select("+_id");

  try {
    if (findAdmin) {
      // We find the Admin account
      if (
        SHA256(req.fields.password + findAdmin.salt).toString(encBase64) ===
        findAdmin.hash
      ) {
        return res.json({
          _id: findAdmin._id,
          token: findAdmin.token
        });
        // Wrong password
      } else {
        return res.status(401).json({
          error: "Ce n'est pas le bon mot de passe. Veuillez réeesayer."
        });
      }
      // We don't find the Admin account
    } else {
      return res
        .status(404)
        .json({ error: "Compte non trouvé. Veuillez réessayer." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
