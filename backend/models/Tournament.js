const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Class",
  },
  scores: [
    {
      type: Object,
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      studentScore: {
        type: Number,
        required: true,
      },
    },
  ],
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
