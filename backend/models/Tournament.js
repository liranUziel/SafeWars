const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Class",
  },
  showScore: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), // Add 7 days(one week) to the current date
  },
});

module.exports = mongoose.model("tournament", tournamentSchema);
