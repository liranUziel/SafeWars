//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const Class = require('../models/Class');
const Safe = require('../models/Safe');
const User = require('../models/User');

// @desc get class info
// @route GET /class/
// @access private

const getClass = aysncHanler(async (req, res) => {
	const { _id: id, userType } = req.user;
	classIn = {};
	if (userType === 'student') {
		classIn = await Class.find({ studentIds: id }).select({
			classInfo: 1,
		});
	} else if (userType === 'instructor' || userType === 'admin') {
		classIn = await Class.find({ instructorId: id }).select({
			classInfo: 1,
		});
	}

	res.status(200).json(classIn);
});

const getAdminSafes = aysncHanler(async (req, res) => {
	//load public safe
	const admin = await User.findOne({ userType: 'admin' });
	const safe = await Safe.find({ user: admin._id });

	res.status(200).json(safe);
});

const getStudentsInClass = aysncHanler(async (req, res) => {
	const { classId } = req.query;
	const classIn = await Class.findById(classId).populate('studentIds');

	let studentList = await Promise.all(
		await classIn.studentIds.map(async (student) => {
			const currSafe = await Safe.findOne({ user: student._id });
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
