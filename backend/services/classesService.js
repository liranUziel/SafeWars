const Class = require('../database/models/Class');
const User = require('../database/models/User');

const getClassById = async (classId) => {
	return await Class.findById(classId);
};

const getClassesdByStudentId = async (studentId) => {
	return await Class.find({ studendIds: studentId });
};

const getClassesdByInstructorId = async (instructorId) => {
	return await Class.find({ instructorId });
};

const getPopulatedClassById = async (classId) => {
	return await Class.findById(classId).populate('studentIds');
};
module.exports = {
	getClassById,
	getClassesdByStudentId,
	getClassesdByInstructorId,
	getPopulatedClassById,
};
