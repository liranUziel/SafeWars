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

const createClass = async (className, classNumber, instructorId, district) => {
	return await Class.create({ classInfo: { className, classNumber }, instructorId, district });
};

const addStudent = async (classId, studentId) => {
	await Class.findByIdAndUpdate(classId, { $push: { studentIds: studentId } });
};

module.exports = {
	getClassById,
	getClassesdByStudentId,
	getClassesdByInstructorId,
	getPopulatedClassById,
	createClass,
	addStudent,
};
