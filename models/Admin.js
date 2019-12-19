const mongoose = require("mongoose");

const Admin = mongoose.model("Admin", {
  emailAddress: { type: String, required: true },
  token: String,
  salt: { type: String, select: false },
  hash: { type: String, select: false }
});

module.exports = Admin;
