//wrap async and then we don't have to use try catch
const asyncHandler = require('express-async-handler');
const Safe = require('../models/Safe');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Class = require('../models/Class');

const numWords = require('num-words');
const fsxtra = require('fs-extra');

// @desc get tournament info
// @route GET /tournament
// @access private

const getTournament = asyncHandler(async (req, res) => {
	let tournaments = await Promise.all(
		await req.classIn.map(async (currClass) => {
			return Tournament.findOne({ class: currClass._id });
		})
	);
	if (tournaments.length === 0 || tournaments[0] === null) {
		return res.status(400).json('No tournament available.');
	}
	if (req.user.userType === 'student') {
		return res.status(200).json({ deadline: tournaments[0]?.deadline });
	}
	if (req.user.userType === 'instructor') {
		return res.status(200).json(tournaments);
	}
});

// @desc create tournament
// @route POST /tournament
// @access private

const createTournamnet = asyncHandler(async (req, res) => {
	// Only instructor can create
	const { classId, showScore, deadline } = req.body;
	if (!classId) {
		return res.status(400).json('Missing classId!');
	}
	console.log('tournamnetCopnto.js ', classId)
	const tournament = await Tournament.findOne({ class: classId });
	if (tournament) return res.status(400).json('Why create again if you have already?');
	// Get the students in the class
	const { studentIds } = await Class.findById(classId);
	const relatedIds = studentIds.concat([req.user._id]);
	//load tournamnt safes
	const safes = await Safe.find({ user: relatedIds, isVerified: true });
	//const amountInWords = numWords(12345)
	const tournamentSafes = safes.map((safe, index) => {
		return { safeName: `safe_${numWords(index)}`, _id: safe._id };
	});

	console.log('tournamnetController.js'.blue)
	// Get all safes of the student and
	const justCreated = await Tournament.create({
		class: classId,
		showScore,
		deadline,
		safes: tournamentSafes,
	});

	res.status(200).json(justCreated);
});

// @desc update tournament info
// @route PUT /tournament
// @access private

const updateTournamnet = asyncHandler(async (req, res) => {
	const { classId, showScore, deadline } = req.body;
	if (!classId || !showScore || !deadline) return res.status(400).json('Missing data.');
	const updated = await Tournament.findOneAndUpdate({ class: classId }, { showScore, deadline });
	res.status(200).json(updated);
});

// @desc get all tournament safes
// @route PUT /tournament/safes
// @access private

const getTournamentSafes = asyncHandler(async (req, res) => {
	// Get all related tournaments to user
	const tournaments = await Promise.all(
		await req.classIn.map(async (currClass) => {
			return Tournament.findOne({ class: currClass._id });
		})
	);
	// Get all related tournaments to user
	const safes = tournaments.map((currTournament) => {
		return currTournament?.safes;
	});
	res.status(200).json(safes[0]);
});

module.exports = {
	getTournament,
	createTournamnet,
	updateTournamnet,
	getTournamentSafes,
};
