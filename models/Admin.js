const mongoose = require("mongoose");

const Admin = mongoose.model("Admin", {
  token: String,
  salt: { type: String, select: false },
  hash: { type: String, select: false }
});

module.exports = Admin;
