const asyncHandler = require('express-async-handler');
const { remove } = require('fs-extra');
const path = require('path');
const { ALLOWED_PERSONAL, getRelativeSafePath, extractAbsoulteSafePathWithName } = require('../constants');
const { getClassById, getClassesdByStudentId, getClassesdByInstructorId } = require('../services/classesService');
const { getSafesByUserId, findByIdAndDelete, getSafeById } = require('../services/safesService');

const prepareUploadSafeData = asyncHandler(async (req, res, next) => {
	const { classesToAdd } = req.params;
	console.log(req.params);
	if (classesToAdd.length === 0) return res.status(400).json('Must add to at least 1 class.');
	// Get class instaces
	req.classesInfo = await Promise.all(
		await classesToAdd.map(async (currClassId) => {
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

const prepareUploadKeyData = asyncHandler(async (req, res, next) => {
	const { safeId } = req.body;
	const safeToBreak = await getSafeById(safeId);
	if (!safeToBreak) {
		return res.status(400).json('Safe not exist!');
	}
	req.safeToBrek = safeToBreak;
	next();
});

const addRegisteredClasses = asyncHandler(async (req, res, next) => {
	let classesAsStudent = await getClassesdByStudentId(req.user.id);
	let classesAsInstructor = await getClassesdByInstructorId(req.user.id);
	req.registeredClasses = [...classesAsStudent, ...classesAsInstructor];
	next();
});

module.exports = {
	prepareUploadSafeData,
	addSafeDataAfterUplaod,
	clearStudentUploadSafe,
	prepareUploadKeyData,
	addRegisteredClasses,
};
