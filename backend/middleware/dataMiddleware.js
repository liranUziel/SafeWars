const asyncHandler = require('express-async-handler');
const { remove } = require('fs-extra');
const path = require('path');
const { ALLOWED_PERSONAL, getRelativeSafePath, extractAbsoulteSafePathWithName } = require('../constants');
const { getClassById } = require('../services/classesService');
const { getSafesByUserId, findByIdAndDelete } = require('../services/safesService');

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

////////////////////////////////////////////////////////
//          DURING REFACTORING OF BACKEND             //
////////////////////////////////////////////////////////
const prepareUploadSafeData = asyncHandler(async (req, res, next) => {
	const { classesToAdd } = req.body;
	if (classesToAdd.length === 0) return res.status(400).json('Must add to at least 1 class.');
	// Get class instaces
	req.classesInfo = await Promise.all(
		classesToAdd.map(async (currClassId) => {
			const classObj = await getClassById(currClassId);
			return { classId: currClassId, ...classObj.classInfo };
		})
	);
	// req.classesInfo = [{classId, className, classNumber}]
	next();
});

const addSafeDataAfterUplaod = asyncHandler(async (req, res, next) => {
	// Extract the Id of the user
	req.safeName = createSafeName(req.user.userId, file);
	req.relativeSafePaths = req.classesInfo.map((currClass) => {
		return getRelativeSafePath(currClass);
	});
	next();
});

// student can upload only one safe for class
const clearStudentUploadSafe = asyncHandler(async (req, res, next) => {
	// if user is instructor or admin skip this part
	if (ALLOWED_PERSONAL.includes(req.user.userType)) return next();
	// Get safes of student
	const existingSafes = await getSafesByUserId(req.user.id);
	for (const safe of existingSafes) {
		// If safe exist in same place override it
		// Remove from db and file
		if (req.relativeSafePaths.includes(safe.relPath)) {
			// Remove compiled and uncompiled safe
			await remove(extractAbsoulteSafePathWithName(safe.relPath, safe.safeName));
			await remove(extractAbsoulteSafePathWithName(safe.relPath, safe.safeName) + '.asm');
			await findByIdAndDelete(safe.id);
		}
	}
	next();
});

module.exports = {
	addClassData,
	addSafeData,
	addUploadSafe,
	addClassDataToSafe,
	prepareUploadSafeData,
	addSafeDataAfterUplaod,
	clearStudentUploadSafe,
};
