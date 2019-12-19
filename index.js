require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

app.use(cors());
app.use(formidableMiddleware());

const estimate = require("./routes/estimate");
app.use(estimate);

const admin = require("./routes/admin");
app.use(admin);

app.listen(process.env.PORT, () => {
  console.log("Server is up !");
});
