const Class = require('../database/models/Class');

const getClassById = async (classId) => {
	return await Class.findById(classId);
};

const getClassesdByStudentId = async (studentId) => {
	return await Class.find({ studendIds: studentId });
};

const getClassesdByInstructorId = async (instructorId) => {
	return await Class.find({ instructorId });
};

module.exports = {
	getClassById,
	getClassesdByStudentId,
	getClassesdByInstructorId,
};
