const mongoose = require("mongoose");

const safeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    safeName: {
      type: String,
      required: [true, "Please add safe name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("safe", safeSchema);
