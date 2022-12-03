const express = require('express');
const { verifyToken, makeSureAdmin } = require('../middleware/authMiddleware');
const { welcome, addSafeToDB, addClassToDB } = require('../controllers/adminController');
const router = express.Router();

//Auth
router.get('/', verifyToken, makeSureAdmin, welcome);

router.post('/safe', verifyToken, makeSureAdmin, addSafeToDB);
router.post('/class', verifyToken, makeSureAdmin, addClassToDB);

module.exports = router;
