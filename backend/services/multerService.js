const fs = require('fs-extra');
const multer = require('multer');
const path = require('path');
const { createSafeName, getAbsouluteSafePath, extractAbsoulteKeyPath } = require('../constants');

// This is for the safes

const safeStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		// For each class add safe
		req.classesInfo.forEach((currClassInfo) => {
			const safePath = getAbsouluteSafePath(currClassInfo);
			// Make sure folder exists and content empty
			fs.ensureDirSync(safePath);
			callback(null, safePath);
		});
	},
	filename: (req, file, callback) => {
		//create the safe name
		const safeName = createSafeName(req.user.userId, file);
		console.log(safeName);

		const temp = String(`${safeName}.asm`);

		callback(null, temp);
	},
});

// This is for the keys

const keyStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		const { user, safeToBreak } = req;
		const keyPath = extractAbsoulteKeyPath(user.userId, safeToBreak);
		fs.ensureDirSync(keyPath);
		callback(null, keyPath);
	},
	filename: (req, file, callback) => {
		//create the fitting key name
		callback(null, `${req.safeToBreak.safeName}.asm`);
	},
});

const mUploadSafe = multer({ storage: safeStorage });
const mUploadKey = multer({ storage: keyStorage });

module.exports = { mUploadSafe, mUploadKey };
