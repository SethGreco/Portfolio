//Common js modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

let Cords = require("./models/cords");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB Connected!");
});

app.use(express.static(__dirname + "/dist"));

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.route("/add").post(function(req, res) {
  let location = new Cords(req.body);
  location
    .save()
    .then(location => {
      res.status(200).json({ location: "Location added!" });
      console.log("Location was logged");
    })
    .catch(err => {
      res.status(400).send("failure to add location");
    });
});

router.route("/get").get(function(req, res) {
  Cords.find(function(err, cords) {
    if (err) {
      console.log(err);
    } else {
      res.json(cords);
    }
  });
});

router.get("/about", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/about.html"));
});

// router.get("/gallery", function(req, res) {
//   res.sendFile(path.join(__dirname + "/dist/js/gallery.js"));
// });

// 404 handles
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/404.html"));
});

//500 handles
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", router);
app.listen(process.env.port || 3000);
