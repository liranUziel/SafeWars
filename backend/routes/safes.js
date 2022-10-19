const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { mUploadSafe, mUploadKey } = require('../services/safeService');
const { downloadSafe, uploadSafe, uploadKeyAndBreak } = require('../controllers/safesController');
const { addClassData, addSafeData } = require('../middleware/dataMiddleware');
const router = express.Router();

// Download Safe
// /safes?safeId=this_is_the_id
router.get('/', protect, addClassData, downloadSafe);
// /safes
router.post('/', protect, addClassData, mUploadSafe.single('safe'), uploadSafe);

// /safes?safeId=this_is_the_id
router.post('/', protect, addClassData, addSafeData, mUploadKey.single('key'), uploadKeyAndBreak);

module.exports = router;
