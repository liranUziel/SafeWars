const express = require('express');
const { protect, mustHaveClass } = require('../middleware/authMiddleware');
const { mUploadSafe, mUploadKey } = require('../services/safeService');
const { downloadSafe, uploadSafe, uploadKeyAndBreak } = require('../controllers/safesController');
const { addClassData, addSafeData, addUploadSafe, notHasSafe } = require('../middleware/dataMiddleware');
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

// /safes?safeId=this_is_the_id
router.post('/', protect, addClassData, mustHaveClass, addSafeData, mUploadKey.single('key'), uploadKeyAndBreak);

module.exports = router;
