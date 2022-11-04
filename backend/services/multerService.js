const fs = require('fs-extra');
const multer = require('multer');
const path = require('path');
const { createSafeName, getAbsouluteSafePath } = require('../constants');

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
		//originalname is the uploaded file's name with extn
		const safeName = createSafeName(req.user.userId, file);
		callback(null, `${safeName}.asm`);
	},
});

// This is for the keys

const keyStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		const { classIn, user, safe } = req;
		classIn.forEach((currClass) => {
			const { classInfo } = currClass;
			const keyPath = path.resolve(
				`${__dirname}\\..\\public\\keys\\${classInfo.className}\\${classInfo.classNumber}\\${user.userId}`
			);
			// Make sure folder exists and content empty
			fs.emptyDirSync(safePath);
			callback(null, keyPath);
			//
		});
	},
	filename: (req, file, callback) => {
		//originalname is the uploaded file's name with extn
		callback(null, `${req.safe.safeName}_key.asm`);
	},
});

const mUploadSafe = multer({ storage: safeStorage });
const mUploadKey = multer({ storage: keyStorage });

module.exports = { mUploadSafe, mUploadKey };
