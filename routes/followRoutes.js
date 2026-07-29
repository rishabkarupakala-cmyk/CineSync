const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const followController = require("../controllers/followController");

router.get("/:username/followers", protect, followController.getFollowers);
router.get("/:username/following", protect, followController.getFollowing);

module.exports = router;