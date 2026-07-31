const express = require("express");

const {
  setupTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
} = require("../controllers/securityController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/2fa/setup", protect, setupTwoFactor);

router.post("/2fa/verify", protect, verifyTwoFactor);

router.post("/2fa/disable", protect, disableTwoFactor);

module.exports = router;