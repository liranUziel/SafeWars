const aysncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserById, createUser, getUserByUserName } = require('../services/usersService');

const TokenGenertor = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

const getUser = aysncHandler(async (req, res) => {
	const { _id, realName, email } = await getUserById(req.user.id);
	res.status(200).json({
		id: _id,
		realName,
		email,
	});
});

const registerUser = aysncHandler(async (req, res) => {
	const { realName, userName, email, password, userId } = req.body;

	if (!realName || !userName || !email || !password || !userId) {
		return res.status(400).json('Some fields are missing!');
	}
	//Check if user exist
	const isUserExist = await getUserByUserName(userName);
	if (isUserExist) {
		return res.status(400).json('UserName is being used!');
	}

	//Hash password
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);

	//Create user
	const user = await createUser(realName, userName, email, hashedPassword, userId);

	// Make sure the user created successfully
	if (user) {
		res.status(201).json({
			id: user.id,
			name: user.realName,
			email: user.email,
			token: TokenGenertor(user.id),
		});
	} else {
		return res.status(400).json('Eror occured while createing user.');
	}
});

const loginUser = aysncHandler(async (req, res) => {
	const { userName, password } = req.body;
	if (!userName || !password) {
		return res.status(400).json('Some fields are missing!');
	}

	// Find the user
	const user = await getUserByUserName(userName);
	// Make sure password is correct
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			id: user.id,
			name: user.realName,
			email: user.email,
			safesSolved: user.solvedSafes,
			userType: user.userType,
			token: TokenGenertor(user.id),
		});
	} else {
		return res.status(400).json('Invalid user data!');
	}
});

module.exports = {
	getUser,
	registerUser,
	loginUser,
};
