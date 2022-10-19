const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const allowedPersonel = ['instructor', 'admin'];

const authorizedProtect = asyncHandler(async (req, res, next) => {
	if (allowedPersonel.includes(req.user.userType)) {
		return next();
	}
	res.status(401).json('You shall not pass!');
});

const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			//Get toke from header
			//token format: 'Bearer token' => split(' ') [Bearer,token]
			token = req.headers.authorization.split(' ')[1];
			//Verfiy token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			//get user from token
			req.user = await User.findById(decoded.id).select('-password');
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

const mustHaveClass = asyncHandler(async (req, res, next) => {
	if (req.classIn.length > 0) {
		return next();
	}
	res.status(401).json('You are not in a class, why even bother upload safe!');
});

module.exports = { protect, authorizedProtect, mustHaveClass };
