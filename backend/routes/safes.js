const express = require("express");

const {
  getClass,
  getAdminSafes,
  downloadSafe,
} = require("../controllers/safesController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../services/safeService");
const {
  getSafe,
  updateSafe,
  uploadSafe,
} = require("../controllers/safesController");
const { addClassData } = require("../middleware/dataMiddleware");
const router = express.Router();

// Download Safe
// /safes?safeId=this_is_the_id
router.get("/", protect, addClassData, downloadSafe);
// /safes
router.post("/", protect, addClassData, uploadSafe, upload.single("safe"));

module.exports = router;
