const express = require("express");
const { initStorage } = require("../services/safeService");

const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/usersController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
//protect this
router.get("/user", protect, getUser);
router.post("/login", loginUser);

router.get("/safe", protect, (req, res) => res.status(245));
router.post("/safe", protect);
router.put("/safe", protect);

module.exports = router;
