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

module.exports = {
  getTournament,
  createTournamnet,
  updateTournamnet,
};
