const mongoose = require("mongoose");

const safeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
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

module.exports = mongoose.model("safes", safeSchema);
