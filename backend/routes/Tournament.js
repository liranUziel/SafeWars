const express = require("express");

const {
  getTournament,
  createTournamnet,
  updateTournamnet,
  getTournamentSafes,
} = require("../controllers/tournamentController");
const router = express.Router();

const { addClassData } = require("../middleware/dataMiddleware");
//Auth
const { protect, authorizedProtect } = require("../middleware/authMiddleware");

router.get("/", protect, addClassData, getTournament);

router.post("/", protect, authorizedProtect, createTournamnet);

router.put("/", protect, authorizedProtect, addClassData, updateTournamnet);

router.get("/safes", protect, addClassData, getTournamentSafes);

module.exports = router;
