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
  // Only instructor can create
  const classesIn = req.classIn;
  const wantedClassId = req.body.wantedClassId;
  const tournament = Tournament.findOne({ class: wantedClassId });
  res.status(200).json("TODI: CREATE: " + wantedClassId);
});

// @desc update tournament info
// @route PUT /tournament
// @access private

const updateTournamnet = asyncHandler(async (req, res) => {
  res.status(200).json("TODO: UPDATE TOURNAMENTCool Info");
});

// @desc get all tournament safes
// @route PUT /tournament/safes
// @access private

const getTournamentSafes = asyncHandler(async (req, res) => {
  const relatedIds = [];
  // Get all related Ids to the user
  req.classIn.map((currClass) => {
    relatedIds += [currClass.instructorId + [...currClass.studentIds]];
  });
  //load tournamnt safe
  const safes = await Safe.find({ user: relatedIds });
  // TODO: Change all safe names
  res.status(200).json(safes);
});

module.exports = {
  getTournament,
  createTournamnet,
  updateTournamnet,
  getTournamentSafes,
};
