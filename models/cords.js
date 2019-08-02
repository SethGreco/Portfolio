const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cords = new Schema({
  lat: {
    type: Number
  },
  long: {
    type: Number
  }
});

module.exports = mongoose.model("Cords", Cords);
