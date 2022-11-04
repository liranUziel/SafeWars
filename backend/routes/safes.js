const express = require('express');
const { verifyToken, mustHaveClass, tournamentNotStarted } = require('../middleware/authMiddleware');
const { mUploadSafe, mUploadKey } = require('../services/multerService');
const { downloadSafe, uploadSafe, uploadKeyAndBreak } = require('../controllers/safesController');
const {
	addClassData,
	addSafeData,
	addClassDataToSafe,
	prepareUploadSafeData,
	addSafeDataAfterUplaod,
	clearStudentUploadSafe,
} = require('../middleware/dataMiddleware');
const router = express.Router();

// /safes
router.post(
	'/',
	verifyToken,
	prepareUploadSafeData,
	mUploadSafe.single('safe'),
	addSafeDataAfterUplaod,
	clearStudentUploadSafe,
	uploadSafe
);
// Download Safe
// /safes?safeId=this_is_the_id
router.get('/', verifyToken, addClassData, mustHaveClass, downloadSafe);

// /safes/break?safeId=this_is_the_id
router.post(
	'/break',
	verifyToken,
	addClassData,
	mustHaveClass,
	addSafeData,
	addClassDataToSafe,
	mUploadKey.single('key'),
	uploadKeyAndBreak
);

module.exports = router;
