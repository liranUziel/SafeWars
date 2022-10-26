const express = require('express');

const { welcome } = require('../controllers/adminController');

const router = express.Router();

//Auth
const { protect, makeSureAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, makeSureAdmin, welcome);

module.exports = router;
