const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { mUploadSafe, mUploadKey } = require('../services/multerService');
const { downloadSafe, uploadSafe, uploadKeyAndBreak } = require('../controllers/safesController');
const {
	prepareUploadSafeData,
	addSafeDataAfterUplaod,
	clearStudentUploadSafe,
	prepareUploadKeyData,
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
router.get('/', verifyToken, downloadSafe);

// /safes/break?safeId=this_is_the_id
router.post('/break', verifyToken, prepareUploadKeyData, mUploadKey.single('key'), uploadKeyAndBreak);

module.exports = router;
