const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    classNumber: {
      type: String,
      required: [true, "Please add a class number"],
      unique: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a valid instructor id"],
    },
    students: [mongoose.Schema.Types.ObjectId],
    district: {
      type: string,
      required: [true, "Please add a district"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("class", ClassSchema);
