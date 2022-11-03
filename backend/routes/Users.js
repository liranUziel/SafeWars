const express = require('express');

const { getUser, registerUser, loginUser } = require('../controllers/usersController');
const { getUserSafe } = require('../controllers/safesController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// /users
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, getUser);
router.get('/safe', verifyToken, getUserSafe);

module.exports = router;
