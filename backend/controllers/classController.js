//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const {
	getClassesdByStudentId,
	getClassesdByInstructorId,
	getPopulatedClassById,
	addStudent,
	getClassById,
} = require('../services/classesService');
const { getAdmin, getUserByUserName } = require('../services/usersService');
const { getSafesByUserId, getSafeByStudentId } = require('../services/safesService');

const getClasses = aysncHanler(async (req, res) => {
	const { id, userType } = req.user;
	classesIn = [];
	if (userType === 'student') {
		classesIn = await getClassesdByStudentId(id);
	} else if (userType === 'instructor' || userType === 'admin') {
		classesIn = await getClassesdByInstructorId(id);
	}
	res.status(200).json(classesIn);
});

const getAdminSafes = aysncHanler(async (req, res) => {
	//load public safe
	const admin = await getAdmin();
	const safes = await getSafesByUserId(admin.id);

	res.status(200).json({ safes });
});

const getStudentsInClass = aysncHanler(async (req, res) => {
	const { classId } = req.query;
	const classIn = await getPopulatedClassById(classId);

	let students = await Promise.all(
		await classIn.studentIds.map(async (student) => {
			const currSafe = await getSafeByStudentId(student.id);
			return {
				id: student.id,
				userId: student.userId,
				hasSubmitedSafe: currSafe !== undefined,
				isSafeVerified: currSafe?.isVerified,
				score: student.score,
			};
		})
	);

	res.status(200).json({ students });
});

const addStudentToClass = aysncHanler(async (req, res) => {
	const { classId, studentUserName } = req.body;
	if (!studentUserName || !classId) {
		return res.status(400).json('Missing fields');
	}
	const student = await getUserByUserName(studentUserName);
	if (!student) {
		return res.status(400).json('Missing student');
	}

	await addStudent(classId, student.id);
	const updatedClass = await getClassById(classId);
	res.status(200).json(updatedClass);
});

module.exports = {
	getAdminSafes,
	getClasses,
	getStudentsInClass,
	addStudentToClass,
};
