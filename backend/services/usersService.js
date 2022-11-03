const User = require('../database/models/User');

const getUserById = async (userId) => {
	return await User.findById(userId);
};

const getUserByUserName = async (userName) => {
	return await User.findOne({ userName });
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

module.exports = {
	getUserById,
	createUser,
	getUserByUserName,
};
