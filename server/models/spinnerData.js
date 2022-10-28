const mongoose = require("mongoose");

const spinnerSchema = new mongoose.Schema({
  spinner: [
    {
      x: {
        type: String,
      },
      y: {
        type: Number,
        default: 1,
      },
      text: {
        type: String,
        default: "10%",
      },
      votingPower: {
        type: Number,
        default: 10,
      },
    },
  ],
});

module.exports = mongoose.model("Spinner", spinnerSchema);
