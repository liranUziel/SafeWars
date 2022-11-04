import { resolve, parse } from 'path';
export const USER_TYPES = {
	ADMIN: 'admin',
	INSTRUCTOR: 'instructor',
	STUDENT: 'student',
};

export const ALLOWED_PERSONAL = [USER_TYPES.INSTRUCTOR, USER_TYPES.ADMIN];

export const getRelativeSafePath = ({ className, classNumber }) => {
	console.log('MAKE SURE THIS IS CORRECT PATH'.bgGreen);
	return resolve(`${className}\\${classNumber}`);
};

export const getAbsouluteSafePath = ({ className, classNumber }) => {
	console.log('MAKE SURE THIS IS CORRECT PATH'.bgYellow);
	return resolve(`${__dirname}\\public\\safes\\${className}\\${classNumber}`);
};

export const extractAbsoulteSafePath = (relativePath) => {
	return resolve(`${__dirname}\\public\\safes\\${relativePath}`);
};

export const extractAbsoulteSafePathWithName = (relativePath, safeName) => {
	return resolve(`${__dirname}\\public\\safes\\${relativePath}\\${safeName}`);
};

export const extractAbsoulteKeyPath = (userId, safe) => {
	return resolve(`${__dirname}\\public\\keys\\${safe.relPath}\\${userId}`);
};
export const extractAbsoulteKeyPathWithName = (userId, safe) => {
	return resolve(`${__dirname}\\public\\keys\\${safe.relPath}\\${userId}\\${safe.safeName}`);
};

export const createSafeName = ({ userId, file }) => {
	return userId + '_' + parse(file.originalname).name;
};

export const hasBrokenSafe = (result) => {
	return result.keyScore === 100 && result.safeScore === 0 && result.test === 0;
};
