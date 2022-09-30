//wrap async and then we don't have to use try catch
const asyncHandler = require("express-async-handler");
const Safe = require("../models/Safe");
const User = require("../models/User");
const Tournament = require("../models/Tournament");

// @desc get tournament info
// @route GET /tournament
// @access private

const getTournament = asyncHandler(async (req, res) => {
  res.status(200).json("Cool Info");
});

// @desc create tournament
// @route POST /tournament
// @access private

const createTournamnet = asyncHandler(async (req, res) => {
  res.status(200).json("Cool Info");
});

// @desc update tournament info
// @route PUT /tournament
// @access private

const updateTournamnet = asyncHandler(async (req, res) => {
  res.status(200).json("Cool Info");
});

// @desc get all tournament safes
// @route PUT /tournament/safes
// @access private

const getTournamentSafes = asyncHandler(async (req, res) => {
  let safes = [];
  const { _id: id, userType } = req.user;
  if (userType === "student") {
    classIn = await Class.find({ studentIds: id });
  } else if (userType === "instructor") {
    classIn = await Class.find({ instructorId: id });
  }
  //load public safe
  const admin = await User.findOne({ userType: "admin" });
  const safe = await Safe.find({ user: admin._id });
  res.status(200).json("Cool Info");
});

module.exports = {
  getTournament,
  createTournamnet,
  updateTournamnet,
  getTournamentSafes,
};
