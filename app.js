const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./config/passport");
const app = express();
const api = require("./routes.js");
const uri = require("./config/db");
const port = 3000;

app.use(bodyParser.json());

// console.log(uri);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", function () {
    console.log("Connected to Database");
  })
  .on("error", function (err) {
    console.log("Database Error", err);
  });

app.use("/api", api);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`DL Task listening on ` + port + ` port!`));
