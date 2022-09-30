//wrap async and then we don't have to use try catch
const aysncHanler = require("express-async-handler");
const Class = require("../models/Class");
const Safe = require("../models/Safe");
const User = require("../models/User");

// @desc get class info
// @route GET /class/
// @access private

const getClass = aysncHanler(async (req, res) => {
  const { id, userType } = req.body.user;
  classIn = {};
  if (userType === "student") {
    const classIn = await Class.find({ students: { _id: id } });
  }
  //load public safe
  // const calsses = await Class.find({});
  // const safe = await Safe.find({ user: admin._id });

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
