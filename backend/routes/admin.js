const express = require('express');
const { verifyToken, makeSureAdmin } = require('../middleware/authMiddleware');
const { welcome } = require('../controllers/adminController');
const router = express.Router();

//Auth
router.get('/', verifyToken, makeSureAdmin, welcome);

module.exports = router;
