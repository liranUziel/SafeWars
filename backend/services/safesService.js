const Safe = require('../database/models/Safe');

const getSafeById = async (safeId) => {
	return await Safe.findById(safeId);
};

const getSafesByUserId = async (userId) => {
	return await Safe.find({ ownerId: userId });
};

const getSafeByStudentId = async (studentId) => {
	return await Safe.findOne({ ownerId: studentId });
};

const getSafesByUserIdAndRelPath = async (ownerId, relPath) => {
	return await Safe.find({ ownerId, relPath });
};

const findByIdAndDelete = async (safeId) => {
	return await Safe.findByIdAndDelete(safeId);
};

const createSafe = async (userId, safeName, relPath) => {
	return await Safe.create({ ownerId: userId, safeName, relPath });
};

const verifySafe = async (safeId) => {
	await Safe.findByIdAndUpdate(safeId, { isVerified: true });
};

const getTournamentSafes = async (relatedIds, relPath) => {
	return await Safe.find({ ownerId: relatedIds, isVerified: true, relPath });
};

const getTournamentSafesById = async (tournamentId) => {
	const { safes } = await getTournamentById(tournamentId);
	return safes;
};

module.exports = {
	getSafeById,
	getSafesByUserId,
	getSafeByStudentId,
	findByIdAndDelete,
	createSafe,
	verifySafe,
	getSafesByUserIdAndRelPath,
	getTournamentSafes,
	getTournamentSafesById,
};

const { getTournamentById } = require('./tournamentService');
