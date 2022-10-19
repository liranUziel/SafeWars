const fs = require('fs-extra');
const multer = require('multer');
const path = require('path');

// This is for the safes

const safeStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		console.log('IM HERE1');
		const classIn = req.classIn;
		console.log('HERE:::::');
		console.log('A' + classIn);
		classIn.forEach((currClass) => {
			const { classInfo } = currClass;
			let path = `${__dirname}/../public/safes/${classInfo.className}/${classInfo.classNumber}`;
			//DEBUG
			console.log(path);
			fs.mkdirsSync(path);
			callback(null, path);
		});
	},
	filename: (req, file, callback) => {
		console.log('IM HERE2');
		const safeName = req.user.userId + '_' + path.parse(file.originalname).name;
		//originalname is the uploaded file's name with extn
		callback(null, `${safeName}_safe.asm`);
	},
});

// This is for the keys

const keyStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		const { classIn, user, safe } = req;
		console.log('HERE:::::');
		console.log(classIn);
		classIn.forEach((currClass) => {
			const { classInfo } = currClass;
			let path = `${__dirname}/../public/keys/${classInfo.className}/${classInfo.classNumber}/${user.userName}`;
			//DEBUG
			console.log(path);
			fs.mkdirsSync(path);
			callback(null, path);
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
