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
	const safe = await Safe.findById(safeId).populate('user');
	req.safe = safe;
	next();
});

const addUploadSafe = asyncHandler(async (req, res, next) => {
	// Extract the Id of the user
	req.safe = { safeName: req.user.userId + '_' + path.parse(req.file.originalname).name };
	next();
});

const addClassDataToSafe = asyncHandler(async (req, res, next) => {
	// Extract the Id of the user
	let classIn = {};
	const userId = req.safe.user._id;
	if (req.safe.user.userType === 'student') {
		classIn = await Class.findOne({ studentIds: userId });
	} else if (req.safe.user.userType === 'instructor') {
		classIn = await Class.findOne({ instructorId: userId });
	}
	req.safe.classIn = classIn;
	next();
});

module.exports = { addClassData, addSafeData, addUploadSafe, addClassDataToSafe };
