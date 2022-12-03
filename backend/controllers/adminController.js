//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const { createSafe, verifySafe } = require('../services/safesService');

const welcome = aysncHanler(async (req, res) => {
	res.status(200).json('You are the mighty one!');
});

const addSafeToDB = aysncHanler(async (req, res) => {
	const { safeName } = req.body;
	if (!safeName) {
		return res.status(400).json('Missing safeName');
	}
	const newSafe = await createSafe(req.user.id, safeName, 'admin');
	const verifiedSafe = await verifySafe(newSafe.id);
	res.status(200).json(verifiedSafe);
});

module.exports = { welcome, addSafeToDB };
