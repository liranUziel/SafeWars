const Class = require('../database/models/Class');
const ObjectId = require('mongoose').Types.ObjectId;

const getClassById = async (classId) => {
	return await Class.findById(classId);
};

const getClassesdByStudentId = async (studentId) => {
	return await Class.find({ studentIds: studentId });
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
