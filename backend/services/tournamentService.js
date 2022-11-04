const Tournament = require('../database/models/Tournament');
const numWords = require('num-words');
const { getRelativeSafePath } = require('../constants');

const getTournamentById = async (tournamentId) => {
	return await Tournament.findById(tournamentId);
};

const getTournamentByClass = async (classId) => {
	return await Tournament.findOne({ classRelated: classId });
};

const createTournamnet = async ({ instructorId, classRelatedId, showScore, deadline }) => {
	// Get the students in the class
	const { studentIds, classInfo } = await getClassById(classRelatedId);
	const relatedIds = [...studentIds, instructorId];
	// Get tournamnt safes
	const safes = await getTournamentSafes(relatedIds, getRelativeSafePath(classInfo));
	const tournamentSafes = safes.map((safe, index) => {
		return { displayName: `safe_${numWords(index)}`, safeId: safe.id };
	});

	// Get all safes of the student and
	const justCreated = await Tournament.create({
		classRelated: classRelatedId,
		showScore,
		deadline,
		safes: tournamentSafes,
	});
	return justCreated;
};

const updateTournamnet = async ({ classId, showScore, deadline }) => {
	return await Tournament.findOneAndUpdate({ class: classId }, { showScore, deadline });
};

module.exports = { getTournamentById, getTournamentByClass, createTournamnet, updateTournamnet };

const { getClassById } = require('./classesService');
const { getTournamentSafes } = require('./safesService');
