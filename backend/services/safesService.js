const Safe = require('../database/models/Safe');

const getSafeById = async (safeId) => {
	return await User.findById(safeId);
};

const getSafesByUserId = async (userId) => {
	return await Safe.find({ user: userId });
};

const getSafeByStudentId = async (studentId) => {
	return await Safe.findOne({ user: studentId });
};

const findByIdAndDelete = async (safeId) => {
	return await Safe.findByIdAndDelete(safeId);
};

const createSafe = async (userId, safeName, path) => {
	return await Safe.create({ user: userId, safeName, path });
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
};
