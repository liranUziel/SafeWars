//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const Class = require('../models/Class');
const Safe = require('../models/Safe');
const User = require('../models/User');

const { getClassById, getClassesdByStudentId, getClassesdByInstructorId } = require('../services/classesService');

// @desc get class info
// @route GET /class/
// @access private

const getClass = aysncHanler(async (req, res) => {
	const { id, userType } = req.user;
	classIn = [];
	if (userType === 'student') {
		classId = await getClassesdByStudentId(id);
	} else if (userType === 'instructor' || userType === 'admin') {
		classIn = await getClassesdByInstructorId(id);
	}

	res.status(200).json(classIn);
});

const getAdminSafes = aysncHanler(async (req, res) => {
	//load public safe
	const admin = await getAdmin();
	const safes = await getSafesByUserId(admin.id);

	res.status(200).json(safes);
});

const getStudentsInClass = aysncHanler(async (req, res) => {
	const { classId } = req.query;
	const classIn = await getPopulatedClassById(classId);

	let studentList = await Promise.all(
		await classIn.studentIds.map(async (student) => {
			const currSafe = await getSafeByStudentId(student.id);
			return {
				id: student.userName,
				name: student.realName,
				hasSubmitedSafe: currSafe !== undefined,
				score: 'No Score Available!',
			};
		})
	);

	res.status(200).json(studentList);
});

module.exports = {
	getAdminSafes,
	getClass,
	getStudentsInClass,
};
