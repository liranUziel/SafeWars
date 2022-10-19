const asyncHandler = require('express-async-handler');
const path = require('path');
const Class = require('../models/Class');
const Safe = require('../models/Safe');

const addClassData = asyncHandler(async (req, res, next) => {
	const { _id: id, userType } = req.user;
	let classIn = {};
	if (userType === 'student') {
		classIn = await Class.find({ studentIds: id });
	} else if (userType === 'instructor') {
		classIn = await Class.find({ instructorId: id });
	}
	req.classIn = classIn;
	next();
});

const addSafeData = asyncHandler(async (req, res, next) => {
	// Extract the Id of the user
	const safeId = req.query.safeId;
	const safe = Safe.findById(safeId).populate('user');
	req.safe = safe;
	next();
});

const addUploadSafe = asyncHandler(async (req, res, next) => {
	// Extract the Id of the user
	req.safe = { safeName: req.user.userId + '_' + path.parse(req.file.originalname).name };
	next();
});

const notHasSafe = asyncHandler(async (req, res, next) => {
	// Extract the Id of the user
	const safe = Safe.findOne({ user: req.user._id });
	if (!safe) return next();
	res.status(400).json('You have safe already.');
});

module.exports = { addClassData, addSafeData, addUploadSafe, notHasSafe };
