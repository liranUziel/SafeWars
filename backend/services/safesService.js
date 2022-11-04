const Safe = require('../database/models/Safe');

const getSafeById = async (safeId) => {
	return await User.findById(safeId);
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

module.exports = {
	getSafeById,
	getSafesByUserId,
	getSafeByStudentId,
	findByIdAndDelete,
	createSafe,
	verifySafe,
	getSafesByUserIdAndRelPath,
};
