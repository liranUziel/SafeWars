const express = require("express");

const { getClass, getAdminSafes } = require("../controllers/classController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

//protect this path
//all public safe
//localhost/class/
router.get("/", protect, getClass);

//protect this path
//all public safes
//localhost/class/safes
router.get("/safes", protect, getAdminSafes);

module.exports = router;
