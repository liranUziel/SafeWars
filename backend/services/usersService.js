const User = require('../database/models/User');
const { USER_TYPES } = require('../constants');

const getUserById = async (userId) => {
	return await User.findById(userId);
};

const getUserByUserName = async (userName) => {
	return await User.findOne({ userName });
};

const getAdmin = async () => {
	return await User.findOne({ userType: USER_TYPES.ADMIN });
};

const createUser = async ({ realName, userName, email, password, userId }) => {
	const user = await User.create({
		realName,
		userName,
		email,
		password,
		userId,
	});
	return user;
};

const updateUserScore = async (userId, score) => {
	await User.findByIdAndUpdate(userId, { score });
};

const updateUserSolvedSafes = async (userId, safeId) => {
	await User.findByIdAndUpdate(userId, { $push: { solved: safeId } });
};

module.exports = {
	getUserById,
	createUser,
	getUserByUserName,
	getAdmin,
	updateUserScore,
	updateUserSolvedSafes,
};
