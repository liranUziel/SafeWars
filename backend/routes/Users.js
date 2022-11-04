const express = require('express');

const { getUser, registerUser, loginUser } = require('../controllers/usersController');
const { getUserSafes } = require('../controllers/safesController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// /users
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, getUser);
router.get('/safe', verifyToken, getUserSafes);

module.exports = router;
