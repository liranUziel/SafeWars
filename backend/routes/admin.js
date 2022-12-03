const express = require('express');
const { verifyToken, makeSureAdmin } = require('../middleware/authMiddleware');
const { welcome, addSafeToDB } = require('../controllers/adminController');
const router = express.Router();

//Auth
router.get('/', verifyToken, makeSureAdmin, welcome);

router.post('/safe', verifyToken, makeSureAdmin, addSafeToDB);

module.exports = router;
