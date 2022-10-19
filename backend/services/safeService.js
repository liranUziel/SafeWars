const fs = require('fs-extra');
const multer = require('multer');

// This is for the safes

const safeStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		const classIn = req.classIn;
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
		const safeName = req.user + '_' + file.filename;
		req.safe.safeName = safeName; // Add to upload safe
		//originalname is the uploaded file's name with extn
		callback(null, `${safeName}_safe.asm`);
	},
});

const mUploadSafe = multer({ safeStorage });

// This is for the keys

const keyStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		const { classIn, user, safe } = req;
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

const mUploadKey = multer({ keyStorage });

module.exports = { mUploadSafe, mUploadKey };
