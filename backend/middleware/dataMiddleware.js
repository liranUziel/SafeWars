const asyncHandler = require('express-async-handler');
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

module.exports = { addClassData, addSafeData };
