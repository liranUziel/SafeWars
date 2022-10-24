//wrap async and then we don't have to use try catch
const asyncHandler = require('express-async-handler');
const Safe = require('../models/Safe');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Class = require('../models/Class');
const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs-extra');

const getUserSafe = asyncHandler(async (req, res) => {
	//load user safe
	const safe = await Safe.find({ user: req.user.id }).select('safeName _id isVerified');
	if (safe.length === 0) {
		return res.status(400).json('Upload at first a safe');
	}
	res.status(200).json(safe);
});

const updateSafe = asyncHandler(async (req, res) => {
	return res.status(609).json('Have to implement');

	const safe = await Safe.findById(req.params.id);
	if (!safe) {
		res.status(400);
		throw new Error('Safe not found');
	}

	//Check for user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	//Make sure the logged in user matches the safe user
	if (safe.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedSafe = await Safe.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedSafe);
});

const uploadSafe = asyncHandler(async (req, res) => {
	const newSafe = await Safe.create({
		user: req.user._id,
		safeName: req.safe.safeName,
	});
	res.status(201).json({ safeId: newSafe._id });
});

const uploadKeyAndBreak = asyncHandler(async (req, res) => {
	const { user, safe } = req;
	const { classInfo } = req.safe.classIn; //student [0] teacher [0,1] admin [0,1,2,...]
	let safePath =
		safe.user.userType === 'admin'
			? `${__dirname}/../public/safes/admin/${req.safe.safeName}_safe.asm`
			: `${__dirname}/../public/safes/${classInfo.className}/${classInfo.classNumber}/${req.safe.safeName}_safe.asm`;
	let keyPath = `${__dirname}/../public/keys/${classInfo.className}/${classInfo.classNumber}/${user.userName}/${req.safe.safeName}_key.asm`;
	// Nedded Data ro break
	userId = user.userId;
	safeName = req.safe.safeName;
	safePath = path.resolve(safePath);
	keyPath = path.resolve(keyPath);
	// Break the safe and hope for the best
	const result = getBreakResults(userId, safeName, safePath, keyPath);
	if (!result) return res.status(400).json('Some error happend while breaking safe');

	console.log(result);

	const hasBeenBroken = result.keyScore === 100 && result.safeScore === 0 && result.test === 0;

	// If the user breaks it's own safe verify it
	if (safe.user._id.equals(user._id)) {
		await Safe.findByIdAndUpdate(safe._id, { isVerified: true });
		console.log('SELF BREAK');
	}
	res.status(201).json({ hasBeenBroken });
});

const downloadSafe = asyncHandler(async (req, res) => {
	// Extract the Id of the user
	const safeId = req.query.safeId;
	//load safe na
	const safe = await Safe.findById(safeId);
	if (!safe) {
		return res.status(400).json('No such safe!');
	}
	// Find the data about the user that holds the safe
	const user = await User.findById(safe.user);
	// Find the class where the user is in
	const classOfUser = await Class.findOne({ studentIds: user._id });
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
	const pathToScript = path.resolve(`${__dirname}\\..\\workspace\\breakSafeWithKey.py`);
	// Run the script and try to break the safe
	const { status, output, error } = await spawn('python3', [pathToScript, userId, safeName, safePath, keyPath]);

	// Check no errors happened
	if (status !== 0 || error) {
		output.forEach((element) => {
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
	const pathToScript = path.resolve(`${__dirname}\\..\\workspace\\nasmCompile.py`);
	// Run the script and try to break the safe
	const { status, output, error } = await spawn('python3', [pathToScript, srcPath, dstPath]);
	console.log('compileFile output:', output);

	// Check no errors happened
	return status !== 0 || error;
};

module.exports = {
	getUserSafe,
	updateSafe,
	uploadSafe,
	downloadSafe,
	uploadKeyAndBreak,
};
