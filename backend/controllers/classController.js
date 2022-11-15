//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const {
	getClassesdByStudentId,
	getClassesdByInstructorId,
	getPopulatedClassById,
} = require('../services/classesService');
const { getAdmin } = require('../services/usersService');
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
				isSafeVerified: currSafe.isVerified,
				score: student.score,
			};
		})
	);

	res.status(200).json({ students });
});

module.exports = {
	getAdminSafes,
	getClasses,
	getStudentsInClass,
};
