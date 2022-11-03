const express = require('express');

const { getUser, registerUser, loginUser } = require('../controllers/usersController');
const { getUserSafe } = require('../controllers/safesController');
const { protect } = require('../middleware/authMiddleware');
const { addClassData } = require('../middleware/dataMiddleware');
const router = express.Router();

// /users
router.post('/', registerUser);
router.get('/user', protect, getUser);
router.post('/login', loginUser);
router.get('/safe', protect, addClassData, getUserSafe);

module.exports = router;
