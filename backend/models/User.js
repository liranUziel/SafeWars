const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    realName: {
      type: String,
      required: [true, "Please add a name"],
    },
    userName: {
      type: String,
      required: [true, "Please add a user name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    userType: {
      type: String,
      default: "student",
    },
    solvedSafes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Safe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UserSchema);
