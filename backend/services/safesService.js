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

module.exports = {
	getSafeById,
	getSafesByUserId,
	getSafeByStudentId,
};
