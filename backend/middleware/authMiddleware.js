const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { USER_TYPES, ALLOWED_PERSONAL } = require('../constants');
const { getUserById } = require('../services/usersService');

const verifyToken = asyncHandler(async (req, res, next) => {
	let token = undefined;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			//Get toke from header
			//token format: 'Bearer token' => split(' ') [Bearer,token]
			token = req.headers.authorization.split(' ')[1];
			console.log(`autoMiddleware.js: token is ${token}`);
			//Verfiy token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			//get user from token
			req.user = await getUserById(decoded.id);
			next();
		} catch (err) {
			console.log(err);
			res.status(401).json('Not authorized');
		}
	}
	if (!token) {
		res.status(401).json('Not authorized, no token');
	}
});

const authorizedProtect = asyncHandler(async (req, res, next) => {
	if (ALLOWED_PERSONAL.includes(req.user.userType)) {
		return next();
	}
	res.status(401).json('You shall not pass!');
});

const makeSureAdmin = asyncHandler(async (req, res, next) => {
	if (USER_TYPES.ADMIN === req.user.userType) {
		return next();
	}
	res.status(401).json('Only the mighty admin can do this!');
});

module.exports = { verifyToken, authorizedProtect, makeSureAdmin };
