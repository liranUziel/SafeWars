//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const { ALLOWED_PERSONAL } = require('../constants');
const { createClass } = require('../services/classesService');
const { createSafe, verifySafe, getSafeById } = require('../services/safesService');
const { getUserByUserName } = require('../services/usersService');

const welcome = aysncHanler(async (req, res) => {
	res.status(200).json('You are the mighty one!');
});

const addSafeToDB = aysncHanler(async (req, res) => {
	const { safeName } = req.body;
	if (!safeName) {
		return res.status(400).json('Missing safeName');
	}
	const newSafe = await createSafe(req.user.id, safeName, 'admin');
	await verifySafe(newSafe.id);
	const verifiedSafe = await getSafeById(newSafe.id);
	res.status(200).json(verifiedSafe);
});

const addClassToDB = aysncHanler(async (req, res) => {
	const { className, classNumber, instructorUserName, district } = req.body;
	if (!className || !classNumber || !instructorUserName || !district) {
		return res.status(400).json('Missing fields!');
	}
	const instructor = await getUserByUserName(instructorUserName);
	if (!instructor) {
		return res.status(400).json('No instructor!');
	}
	if (!ALLOWED_PERSONAL.includes(instructor.userType)) {
		return res.status(400).json('Not instructor or admin');
	}
	const newClass = await createClass(className, classNumber, instructor.id, district);
	res.status(200).json(newClass);
});

module.exports = { welcome, addSafeToDB, addClassToDB };
