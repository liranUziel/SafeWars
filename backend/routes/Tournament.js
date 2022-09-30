const express = require("express");

const {
  getTournament,
  createTournamnet,
  updateTournamnet,
  getTournamentSafes,
} = require("../controllers/tournamentController");
const router = express.Router();

//Auth
const { protect, authorizedProtect } = require("../middleware/authMiddleware");

router.get("/", protect, authorizedProtect, getTournament);

router.post("/", protect, authorizedProtect, createTournamnet);

router.put("/", protect, authorizedProtect, updateTournamnet);

router.get("/safes", protect, getTournamentSafes);

module.exports = router;
