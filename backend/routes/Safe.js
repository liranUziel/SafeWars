const express = require("express");

// Init Upload
const {
  getSafe,
  updateSafe,
  uploadSafe,
} = require("../controllers/safeController");
const router = express.Router();

//Auth
const { protect } = require("../middleware/authMiddleware");

//user can download public (bin) and his safe (asm or bin)
router.get("/", protect, getSafe);

router.post("/", protect, uploadSafe);

//reupload only his own safe file
router.put("/", protect, updateSafe);

module.exports = router;
