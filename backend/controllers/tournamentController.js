//wrap async and then we don't have to use try catch
const asyncHandler = require("express-async-handler");
const Safe = require("../models/Safe");
const User = require("../models/User");
const Tournament = require("../models/Tournament");

// @desc get tournament info
// @route GET /tournament
// @access private

const getTournament = asyncHandler(async (req, res) => {
  let tournaments = await Promise.all(
    await req.classIn.map(async (currClass) => {
      return Tournament.findOne({ class: currClass._id });
    })
  );
  if (tournaments.length === 0) {
    return res.status(400).json("No tournament available.");
  }
  if (req.user.userType === "student") {
    return res.status(200).json({ deadline: tournaments[0].deadline });
  }
  if (req.user.userType === "instructor") {
    return res.status(200).json(tournaments);
  }
});

// @desc create tournament
// @route POST /tournament
// @access private

const createTournamnet = asyncHandler(async (req, res) => {
  // Only instructor can create
  const { wantedClassId, showScore, deadline } = req.body;
  const tournament = await Tournament.findOne({ class: wantedClassId });
  if (tournament !== undefined)
    return res.status(400).json("Why create again if you have already?");
  const justCreated = await Tournament.create({
    class: wantedClassId,
    showScore,
    deadline,
  });
  res.status(200).json(justCreated);
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
  let relatedIds = [];
  // Get all related Ids to the user
  req.classIn.map((currClass) => {
    // []: relatedIds = relatedIds + currClass.instructorId + currClass.studentIds
    relatedIds = relatedIds.concat(
      [currClass.instructorId].concat(currClass.studentIds)
    );
  });
  //load tournamnt safe
  const safes = await Safe.find({ user: relatedIds });
  // TODO: Change all safe names
  safes.map((safe) => {
    return { ...safe, safeName: "CHANGED-" + safe.safeName };
  });
  res.status(200).json(safes);
});

module.exports = {
  getTournament,
  createTournamnet,
  updateTournamnet,
  getTournamentSafes,
};
