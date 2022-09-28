const express = require("express");

const { getSafe } = require("../controllers/classController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

//protect this login
//all public safe
//localhost/class/safe
router.get("/safes");

//protect this login + class
//localhost/class/safes/turnamment
//all private safe
router.get("/safes/turnament", getSafe);

module.exports = router;
