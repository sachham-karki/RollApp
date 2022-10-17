const mongoose = require("mongoose");

const spinnerSchema = new mongoose.Schema({
  spinner: [
    {
      x: {
        type: String,
      },
      y: {
        type: Number,
        default:0
      },
      text: {
        type: String,
        default:"0%"
      },
    },
  ],
});

module.exports = mongoose.model("Spinner", spinnerSchema);
