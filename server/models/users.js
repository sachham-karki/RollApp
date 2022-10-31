const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  votingPower: {
    type: Number,
    default: 10,
  },
  votes: [
    {
      items: {
        type: String,
      },
      voteCount: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
