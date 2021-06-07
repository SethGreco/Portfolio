//Common js modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const helmet = require("helmet");
const request = require("request");

app.use(helmet.hidePoweredBy({ setTo: "DummyServer 1.0" })); //change value of X-Powered-By header to given value
app.use(helmet.noCache({ noEtag: true })); //set Cache-Control header
app.use(helmet.noSniff()); // set X-Content-Type-Options header
app.use(helmet.frameguard()); // set X-Frame-Options header
app.use(helmet.xssFilter()); // set X-XSS-Protection header

// Cross origin corsmiddleware
app.use(cors());
app.use(express.json());

// export models and assigned here to Cords
const Cords = require("./models/cords");
// const { request } = require("http");

mongoose.Promise = global.Promise;

// Connection being defined for mongoose
mongoose.connect(keys.mongoURI, 
                { useNewUrlParser: true, 
                  useUnifiedTopology: true });

// connection variable assigned
const connection = mongoose.connection;

// Connection being opened to remote Mongo DB
connection.once("open", function() {
  console.log("MongoDB Connected!");
});

// included so that node can have access and "see" all my
// resources being used inside my html & css files.
app.use(express.static(__dirname + "/dist"));

// base Home page route defined.
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// route for projects file
router.get("/projects", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/projects.html"));
});

// Route made to post new records to Remote MongoDB.
// Cords defined as the model for DB entries
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

// web route made to fetch records out of remote MongoDB.
// Cords defined as the model for DB entries
router.route("/get").get(function(req, res) {
  Cords.find(function(err, cords) {
    if (err) {
      console.log(err);
    } else {
      res.json(cords);
    }
  });
});


router.get("/photos", function(req, res) {

  let url = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${keys.flickrAPI}&user_id=193082487@N03&tags=${req.query.st}&format=json&nojsoncallback=true`;

  request(url, function(err, response, body) {
    if (err) {
      console.log(err);
    } else {
      console.log("Flickr API request sent");
      res.send(body);
    }
  });
});

// 404 error handle
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/404.html"));
});

//500 error handles
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", router);

app.listen(process.env.PORT || 5000);