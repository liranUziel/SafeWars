//wrap async and then we don't have to use try catch
const asyncHandler = require('express-async-handler');
const Safe = require('../models/Safe');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Class = require('../models/Class');
const path = require('path');

const getUserSafe = asyncHandler(async (req, res) => {
	//load user safe
	const safe = await Safe.find({ user: req.user.id }).select('safeName');
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
	res.status(201).json({ safeId: newSafe.safeId });
});

const uploadKeyAndBreak = asyncHandler(async (req, res) => {
	const { user, safe } = req;
	const { classInfo } = req.classIn;
	const safePath =
		safe.user.userType === 'admin'
			? `${__dirname}/../public/safes/admin/${req.safe.safeName}_safe.asm`
			: `${__dirname}/../public/safes/${classInfo.className}/${classInfo.classNumber}/${req.safe.safeName}_safe.asm`;
	const keyPath = `${__dirname}/../public/keys/${classInfo.className}/${classInfo.classNumber}/${user.userName}/${req.safe.safeName}_key.asm`;
	res.status(201).json({ safePath, keyPath });
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
	let filePath =
		user.userType === 'admin'
			? `${__dirname}/../public/safes/admin`
			: `${__dirname}/../public/safes/${classOfUser.classInfo.className}/${classOfUser.classInfo.classNumber}`;
	filePath = path.resolve(filePath);
	console.log(`Donwloading from: ${filePath}\\${safe.safeName}`);
	res.status(200).sendFile(`${filePath}\\${safe.safeName}`);
});

const solveSafe = asyncHandler(async (req, res) => {
	res.status(505);
});

module.exports = {
	getUserSafe,
	updateSafe,
	uploadSafe,
	downloadSafe,
	uploadKeyAndBreak,
};
