const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  getUserProfile,
  updateProfile,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMyProfile);

router.get("/:username", getUserProfile);

router.put("/", protect, updateProfile);

module.exports = router;