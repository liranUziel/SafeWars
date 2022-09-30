const express = require("express");

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

module.exports = router;
