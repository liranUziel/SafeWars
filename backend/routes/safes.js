const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { mUploadSafe, mUploadKey } = require('../services/multerService');
const { downloadSafe, uploadSafe, uploadKeyAndBreak, deleteSafe } = require('../controllers/safesController');
const {
	prepareUploadSafeData,
	addSafeDataAfterUplaod,
	clearStudentUploadSafe,
	prepareUploadKeyData,
} = require('../middleware/dataMiddleware');
const router = express.Router();

router.post(
	'/',
	verifyToken,
	prepareUploadSafeData,
	addSafeDataAfterUplaod,
	clearStudentUploadSafe,
	mUploadSafe.single('safe'),
	uploadSafe
);
router.get('/', verifyToken, downloadSafe);
router.post('/break', verifyToken, prepareUploadKeyData, mUploadKey.single('key'), uploadKeyAndBreak);
router.delete('/', verifyToken, deleteSafe);

module.exports = router;
