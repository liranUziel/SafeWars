const express = require('express');

const { getClasses, getAdminSafes, getStudentsInClass, addStudentToClass } = require('../controllers/classController');
const { verifyToken, authorizedProtect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getClasses);
router.get('/safes', verifyToken, getAdminSafes);
router.get('/students', verifyToken, authorizedProtect, getStudentsInClass);
router.post('/students', verifyToken, authorizedProtect, addStudentToClass);

module.exports = router;
