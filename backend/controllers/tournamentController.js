//wrap async and then we don't have to use try catch
const asyncHandler = require('express-async-handler');
const { getPopulatedClassById } = require('../services/classesService');
const { getTournamentSafesById } = require('../services/safesService');
const {
	getTournamentByClass,
	createTournamnet,
	updateTournamnet,
	getTournamentById,
} = require('../services/tournamentService');

const getTournaments = asyncHandler(async (req, res) => {
	await getTournamentByClass;
	let tournaments = await Promise.all(
		await req.registeredClasses.map(async (currClass) => {
			return await getTournamentByClass(currClass.id);
		})
	);
	return res.status(200).json({ tournaments });
});

const createTournamnetHandler = asyncHandler(async (req, res) => {
	// Only instructor can create
	const { classId, showScore, deadline } = req.body;
	if (!classId) {
		return res.status(400).json('Missing classId!');
	}
	const oldTournament = await getTournamentByClass(classId);
	if (oldTournament) return res.status(400).json('Why create again if you have already?');
	const newTournament = await createTournamnet({
		instructorId: req.user.id,
		classRelatedId: classId,
		showScore,
		deadline,
	});

	res.status(200).json({ newTournament });
});

const updateTournamnetHandler = asyncHandler(async (req, res) => {
	const { classId, showScore, deadline } = req.body;
	if (!classId || !showScore || !deadline) return res.status(400).json('Missing data.');
	const updated = await updateTournamnet({ classId, showScore, deadline });
	res.status(200).json({ updated });
});

const getTournamentSafesHandler = asyncHandler(async (req, res) => {
	const { tournamentId } = req.body;
	if (!tournamentId) {
		return res.status(400).json('Missing tournament id');
	}
	const safes = await getTournamentSafesById(tournamentId);
	res.status(200).json({ safes });
});

const getScoreBoardHandler = asyncHandler(async (req, res) => {
	const { tournamentId } = req.body;
	if (!tournamentId) {
		return res.status(400).json('Missing tournament id');
	}
	const tournament = await getTournamentById(tournamentId);
	if (!tournament.showScore) {
		return res.status(400).json('Show Score is disabled!');
	}
	const tournamentClass = await getPopulatedClassById(tournament.classRelated);
	const scores = tournamentClass.studentIds.map((user) => {
		return { realName: user.realName, score: user.score };
	});
	scores.sort((a, b) => a.score - b.score);
	res.status(200).json({ scores });
});

module.exports = {
	getTournaments,
	createTournamnetHandler,
	updateTournamnetHandler,
	getTournamentSafesHandler,
	getScoreBoardHandler,
};
