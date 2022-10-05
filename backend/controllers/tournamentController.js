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
  const classIn = req.classIn;
  //load tournamnt safe
  const tournamentSafes = await Tournament.find({ class: classIn._id }).select({
    safes: 1,
  });
  res.status(200).json(tournamentSafes);
});

module.exports = {
  getTournament,
  createTournamnet,
  updateTournamnet,
  getTournamentSafes,
};
