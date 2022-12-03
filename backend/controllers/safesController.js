//wrap async and then we don't have to use try catch
const asyncHandler = require('express-async-handler');
const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs-extra');
const { getSafesByUserId, getSafeById, createSafe, verifySafe } = require('../services/safesService');
const { updateUserScore, updateUserSolvedSafes, getUserById } = require('../services/usersService');
const {
	extractAbsoulteSafePathWithName,
	USER_TYPES,
	extractAbsoulteKeyPathWithName,
	hasBrokenSafe,
	createSafeName,
} = require('../constants');

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
	const safeName = createSafeName(req.user.userId, req.file);
	const newSafes = await Promise.all(
		await req.relativeSafePaths.map(async (relPath) => {
			return await createSafe(req.user.id, safeName, relPath);
		})
	);
	res.status(201).json({ newSafes });
});

const uploadKeyAndBreak = asyncHandler(async (req, res) => {
	const { user, safeToBreak } = req;

	// Diffrent handle for admin safe
	const safeOwner = await getUserById(safeToBreak.ownerId);
	const isAdminSafe = safeOwner.userType === USER_TYPES.ADMIN;

	// Get the paths
	const safePath = extractAbsoulteSafePathWithName(safeToBreak.relPath, safeToBreak.safeName);
	const keyPath = extractAbsoulteKeyPathWithName(user.userId, safeToBreak) + '.asm';

	// Make sure safe exists, if not create
	if (!fs.existsSync(safePath)) {
		const isCompiled = await nasmCompile(`${safePath}.asm`, safePath);
		if (!isCompiled) return res.status(400).json('Some error happend while compiling safe.');
	}
	// Break the safe and hope for the best
	const result = await getBreakResults(user.userId, safeToBreak.safeName, safePath, keyPath);
	if (!result) return res.status(400).json('Some error happend while breaking safe!');

	// This checks if safe has been broken
	const isSucceeded = hasBrokenSafe(result);

	// Some cases if safe was broken
	if (isSucceeded) {
		// Verification
		// If the user breaks it's own safe verify it
		const isOwnSafe = safeOwner.id === user.id;
		if (isOwnSafe) {
			await verifySafe(safeToBreak.id);
		}

		// Get users solved safes array
		let solvedSafes = user.solvedSafes;
		// If safe not in solved of the user, add it and update score for users
		if (!solvedSafes.includes(safeToBreak.id)) {
			// Calculate points
			const increaseBy = isOwnSafe || isAdminSafe ? 0 : 100;
			const decreaseBy = isOwnSafe || isAdminSafe ? 0 : 30;
			// Add to broken safes of breaking user
			await updateUserScore(user.id, user.score + increaseBy);
			await updateUserSolvedSafes(user.id, safeToBreak.id);
			// Decrease from the user who uploaded the safe
			await updateUserScore(safeOwner.id, safeOwner.score - decreaseBy);
		}
	}

	res.status(201).json({ isSucceeded });
});

const downloadSafe = asyncHandler(async (req, res) => {
	// Extract the Id of the user
	const safeId = req.query.safeId;
	//load safe name
	const safe = await getSafeById(safeId);
	if (!safe) {
		return res.status(400).json('No such safe!');
	}
	// Get paths,  dst-safe(bin), src-safe(asm)
	dstFile = extractAbsoulteSafePathWithName(safe.relPath, safe.safeName);
	srcFile = extractAbsoulteSafePathWithName(safe.relPath, safe.safeName) + '.asm';

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
		} catch (error) {
			console.log("Error at 'getBreakResults' (extract JSON)", error);
		}
	});

	if (!result) {
		console.log("Error at 'getBreakResults' (result)");
		return undefined;
	}

	// Last tests
	const hasAllKeys = ['safeName', 'keyScore', 'safeScore', 'test'].every((value) => {
		return value in result;
	});
	if (!hasAllKeys) {
		console.log("Error at 'getBreakResults' (hasAllKeys)");
		return undefined;
	}

	console.log(result);

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

	if (status !== 0 || error) {
		output?.forEach((element) => {
			if (!element) return;
			console.log(element.toLocaleString());
		});
		console.log("Error at 'nasmCompile' (status/error)", error);
	}

	// Check no errors happened
	return status !== 0 || error;
};

module.exports = {
	getUserSafes,
	uploadSafe,
	downloadSafe,
	uploadKeyAndBreak,
};
