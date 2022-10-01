//wrap async and then we don't have to use try catch
const aysncHanler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Class = require("../models/Class");
const Safe = require("../models/Safe");
const User = require("../models/User");

// @desc get class info
// @route GET /class/
// @access private

const getClass = aysncHanler(async (req, res) => {
  const { _id: id, userType } = req.user;
  classIn = {};
  if (userType === "student") {
    classIn = await Class.find({ studentIds: id }).select({
      classInfo: 1,
      _id: 0,
    });
  } else if (userType === "instructor") {
    classIn = await Class.find({ instructorId: id }).select({
      classInfo: 1,
      _id: 0,
    });
  }

  res.status(200).json(classIn);
});

const getAdminSafes = aysncHanler(async (req, res) => {
  //load public safe
  const admin = await User.findOne({ userType: "admin" });
  const safe = await Safe.find({ user: admin._id });

  res.status(200).json(safe);
});

module.exports = {
  getAdminSafes,
  getClass,
};
