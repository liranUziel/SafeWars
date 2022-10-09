const express = require("express");

const {
  getClass,
  getAdminSafes,
  getStudentsInClass,
} = require("../controllers/classController");
const router = express.Router();
const { protect, authorizedProtect } = require("../middleware/authMiddleware");

//protect this path
//localhost/class/
router.get("/", protect, getClass);

//protect this path
//all public safes
//localhost/class/safes
router.get("/safes", protect, getAdminSafes);

router.get("/students", protect, authorizedProtect, getStudentsInClass);

module.exports = router;
