const express = require('express');

const { getClasses, getAdminSafes, getStudentsInClass } = require('../controllers/classController');
const { verifyToken, authorizedProtect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getClasses);
router.get('/safes', verifyToken, getAdminSafes);
router.get('/students', verifyToken, authorizedProtect, getStudentsInClass);

module.exports = router;
