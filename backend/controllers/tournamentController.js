//wrap async and then we don't have to use try catch
const asyncHandler = require('express-async-handler');
const { getTournamentSafesById } = require('../services/safesService');
const { getTournamentByClass, createTournamnet, updateTournamnet } = require('../services/tournamentService');

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
	const safes = await getTournamentSafesById(tournamentId);
	res.status(200).json({ safes });
});

module.exports = {
	getTournaments,
	createTournamnetHandler,
	updateTournamnetHandler,
	getTournamentSafesHandler,
};
