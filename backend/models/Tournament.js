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
    default: null,
  },
});

module.exports = mongoose.model("tournament", tournamentSchema);
