//wrap async and then we don't have to use try catch
const asyncHandler = require('express-async-handler');
const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs-extra');
const { getSafesByUserId, getSafeById, createSafe } = require('../services/safesService');
const { updateUserScore, updateUserSolvedSafes, getUserById } = require('../services/usersService');
const { getClassesdByStudentId } = require('../services/classesService');

const getUserSafes = asyncHandler(async (req, res) => {
	//load user safe
	const safes = await getSafesByUserId(req.user.id);
	if (safes.length === 0) {
		return res.status(400).json('Upload at first a safe');
	}
	res.status(200).json({ safes });
});

const uploadSafe = asyncHandler(async (req, res) => {
	// Create new safes
	const newSafes = await Promise.all(
		req.relativeSafePaths.map(async (relPath) => {
			return await createSafe(req.user.id, req.safeName, relPath);
		})
	);
	res.status(201).json({ newSafes });
});

const uploadKeyAndBreak = asyncHandler(async (req, res) => {
	const { user, safe } = req;
	// Admin can't break
	if (user.userType === 'admin') {
		return res.status(403).json("Admin can't break safe");
	}

	// Needed Data to break safe and etc...
	const userId = user.userId;
	const safeToBreak = req.safe;

	// Diffrent handle for admin safe
	const isAdminSafe = safe.user.userType === 'admin';

	// Get class info of class the user who tries to break

	// Get the safe path
	const finalSafePath = path.resolve(`${__dirname}\\..\\public\\safes\\${safe.path}\\${safeName}`);
	const finalKeyPath = path.resolve(`${__dirname}\\..\\public\\keys\\${safe.path}${userId}\\${safeName}_key.asm`);
	const safePath = isAdminSafe
		? path.resolve(`${__dirname}\\..\\public\\safes\\admin\\${safeName}`)
		: path.resolve(
				`${__dirname}\\..\\public\\safes\\${classInfoSafe.className}\\${classInfoSafe.classNumber}\\${safeName}`
		  );

	// Get the key path
	const keyPath = path.resolve(
		`${__dirname}\\..\\public\\keys\\${classInfoUser.className}\\${classInfoUser.classNumber}\\${userId}\\${safeName}_key.asm`
	);

	// Make sure safe exists, if not create
	if (!fs.existsSync(safePath)) {
		const isCompiled = await nasmCompile(path.resolve(`${safePath}_safe.asm`, safePath));
		if (!isCompiled) return res.status(400).json('Some error happend while breaking safe.');
	}
	// Break the safe and hope for the best
	const result = await getBreakResults(userId, safeName, safePath, keyPath);
	if (!result) return res.status(400).json('Some error happend while breaking safe!');

	// This checks if safe has been broken
	const hasBeenBroken = result.keyScore === 100 && result.safeScore === 0 && result.test === 0;

	// Some cases if safe was broken
	if (hasBeenBroken) {
		// Verification
		// If the user breaks it's own safe verify it
		const isOwnSafe = safe.user.id.equals(user.id);
		if (isOwnSafe) {
			await verifySafe(safe.id);
		}

		// Get users solved safes array
		let solvedSafes = user.solved;
		// If safe not in solved of the user, add it and update score for users
		if (!solvedSafes.includes(safe.id)) {
			// Calculate points
			const increaseBy = isOwnSafe ? 0 : 100;
			const decreaseBy = isOwnSafe ? 0 : 30;
			// Add to broken safes of breaking user
			await updateUserScore(user.id, user.score + increaseBy);
			await updateUserSolvedSafes(user.id, safe.id);
			// Decrease from the user who uploaded the safe
			await updateUserScore(safe.user.id, safe.user.score - decreaseBy);
		}
	}

	res.status(201).json({ hasBeenBroken });
});

const downloadSafe = asyncHandler(async (req, res) => {
	// Extract the Id of the user
	const safeId = req.query.safeId;
	//load safe name
	const safe = await getSafeById(safeId);
	if (!safe) {
		return res.status(400).json('No such safe!');
	}
	// Find the data about the user that holds the safe
	const safeOwner = await getUserById(safe.user.id);
	// Find the class where the user is in
	const classesOfUser = await getClassesdByStudentId(user.id);
	const classOfUser = classesOfUser[0]; // get the first option
	// Get all related paths
	let filePath =
		user.userType === 'admin'
			? `${__dirname}/../public/safes/admin`
			: `${__dirname}/../public/safes/${classOfUser.classInfo.className}/${classOfUser.classInfo.classNumber}`;
	filePath = path.resolve(filePath);
	// Get paths,  dst-safe(bin), src-safe(asm)
	dstFile = path.resolve(`${filePath}\\${safe.safeName}`);
	srcFile = path.resolve(`${filePath}\\${safe.safeName}.asm`);

	// Check if file exist, if not create one
	if (!fs.existsSync(dstFile)) {
		const isCompiled = await nasmCompile(srcFile, dstFile);
		if (!isCompiled) return res.status(400).json('Error happened, ask developers to check');
	}

	res.status(200).sendFile(dstFile);
});

const getBreakResults = async (userId, safeName, safePath, keyPath) => {
	const pathToScript = path.resolve(`${__dirname}\\..\\workspace\\main.py`);
	// Run the script and try to break the safe
	const { status, output, error } = spawnSync('python3', [
		pathToScript,
		'break',
		userId,
		safeName,
		safePath,
		keyPath,
	]);

	// Check if errors happened
	if (status !== 0 || error) {
		output?.forEach((element) => {
			if (!element) return;
			console.log(element.toLocaleString());
		});
		console.log("Error at 'getBreakResults' (status/error)", error);
		return undefined;
	}

	let result = undefined;
	// Extract the data from the script
	output.forEach((element) => {
		if (!element) return;
		try {
			result = JSON.parse(element.toLocaleString());
		} catch (error) {}
	});

	if (!result) {
		console.log("Error at 'getBreakResults' (result)", error);
		return undefined;
	}

	// Last tests
	const hasAllKeys = ['safeName', 'keyScore', 'safeScore', 'test'].every((value) => {
		return value in result;
	});
	if (!hasAllKeys) {
		console.log("Error at 'getBreakResults' (hasAllKeys)", error);
		return undefined;
	}

	// Parse to int values
	result.keyScore = Number.parseInt(result.keyScore);
	result.safeScore = Number.parseInt(result.safeScore);
	result.test = result.test === 'builtin' ? 0 : Number.parseInt(result.test);

	return result;
};

const nasmCompile = async (srcPath, dstPath) => {
	const pathToScript = path.resolve(`${__dirname}\\..\\workspace\\main.py`);
	// Run the script and try to break the safe
	const { status, output, error } = spawnSync('python3', [pathToScript, 'compile', srcPath, dstPath]);
	console.log('compileFile output:', output);

	// Check no errors happened
	return status !== 0 || error;
};

module.exports = {
	getUserSafes,
	uploadSafe,
	downloadSafe,
	uploadKeyAndBreak,
};
