const express = require("express");
const { upload } = require("../services/safeService");

const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/usersController");
const {
  getSafe,
  updateSafe,
  uploadSafe,
} = require("../controllers/safeController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addClassData } = require("../middleware/dataMiddleware");

router.post("/", registerUser);
//protect this
router.get("/user", protect, getUser);
router.post("/login", loginUser);

router.get("/safe", protect, addClassData, getSafe);
router.post("/safe", protect, addClassData, upload.single("safe"), uploadSafe);
router.put("/safe", protect, addClassData, upload.single("safe"), updateSafe);

module.exports = router;
