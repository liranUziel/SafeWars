const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema(
  {
    classInfo: {
      className: {
        type: String,
        default: "Missing",
      },
      classNumber: {
        type: Number,
        default: -1,
      },
      type: Object,
      unique: true,
      required: [true, "Please add class info"],
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a valid instructor id"],
      ref: "User",
    },
    studentIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    district: {
      type: String,
      required: [true, "Please add a district"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("class", ClassSchema);
