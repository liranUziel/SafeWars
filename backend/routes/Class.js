const express = require('express');

const {getSafe} = require('../controllers/classController');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

router.get('/safes',registerUser);
//protect this

module.exports = router;