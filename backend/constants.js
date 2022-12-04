const { join, resolve, parse } = require('path');
const USER_TYPES = {
	ADMIN: 'admin',
	INSTRUCTOR: 'instructor',
	STUDENT: 'student',
};

const ALLOWED_PERSONAL = [USER_TYPES.INSTRUCTOR, USER_TYPES.ADMIN];

const getRelativeSafePath = ({ className, classNumber }) => {
	return join(className, String(classNumber));
};

const getAbsouluteSafePath = ({ className, classNumber }) => {
	return resolve(`${__dirname}\\public\\safes\\${className}\\${classNumber}`);
};

const extractAbsoulteSafePath = (relativePath) => {
	return resolve(`${__dirname}\\public\\safes\\${relativePath}`);
};

const extractAbsoulteSafePathWithName = (relativePath, safeName) => {
	return resolve(`${__dirname}\\public\\safes\\${relativePath}\\${safeName}`);
};

const extractAbsoulteKeyPath = (userId, safe) => {
	return resolve(`${__dirname}\\public\\keys\\${safe.relPath}\\${userId}`);
};
const extractAbsoulteKeyPathWithName = (userId, safe) => {
	return resolve(`${__dirname}\\public\\keys\\${safe.relPath}\\${userId}\\${safe.safeName}`);
};

const createSafeName = (userId, file) => {
	return userId + '_' + parse(file.originalname).name;
};

const hasBrokenSafe = (result) => {
	return result.keyScore === 100 && result.safeScore === 0 && result.test === 50;
};

module.exports = {
	USER_TYPES,
	ALLOWED_PERSONAL,
	getRelativeSafePath,
	getAbsouluteSafePath,
	extractAbsoulteSafePath,
	extractAbsoulteSafePathWithName,
	extractAbsoulteKeyPath,
	extractAbsoulteKeyPathWithName,
	createSafeName,
	hasBrokenSafe,
};
