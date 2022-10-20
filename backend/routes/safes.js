const express = require('express');
const { protect, mustHaveClass } = require('../middleware/authMiddleware');
const { mUploadSafe, mUploadKey } = require('../services/safeService');
const { downloadSafe, uploadSafe, uploadKeyAndBreak } = require('../controllers/safesController');
const { addClassData, addSafeData, addUploadSafe, notHasSafe, addClassDataToSafe } = require('../middleware/dataMiddleware');
const router = express.Router();

// Download Safe
// /safes?safeId=this_is_the_id
router.get('/', protect, addClassData, mustHaveClass, downloadSafe);
// /safes
router.post(
	'/',
	protect,
	addClassData,
	mustHaveClass,
	notHasSafe,
	mUploadSafe.single('safe'),
	addUploadSafe,
	uploadSafe
);

// /safes/break?safeId=this_is_the_id
router.post('/break', protect, addClassData, mustHaveClass, addSafeData, addClassDataToSafe, mUploadKey.single('key'), uploadKeyAndBreak);

module.exports = router;
