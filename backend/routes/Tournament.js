const express = require('express');

const {
	getTournaments,
	createTournamnetHandler,
	updateTournamnetHandler,
	getTournamentSafesHandler,
} = require('../controllers/tournamentController');
const { verifyToken, authorizedProtect } = require('../middleware/authMiddleware');
const { addRegisteredClasses } = require('../middleware/dataMiddleware');
const router = express.Router();

router.get('/', verifyToken, addRegisteredClasses, getTournaments);
router.get('/safes', verifyToken, addRegisteredClasses, getTournamentSafesHandler);
// Authorized protect
router.post('/', verifyToken, authorizedProtect, createTournamnetHandler);
router.put('/', verifyToken, authorizedProtect, addRegisteredClasses, updateTournamnetHandler);

module.exports = router;
