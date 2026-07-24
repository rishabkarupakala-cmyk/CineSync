const express = require("express");

const {
  upsertReview,
  getMovieReviews,
  getMyReview,
  deleteReview,
  getAverageRating,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ---------- Specific routes first ----------

// Public
router.get("/average/:tmdbId", getAverageRating);

// Protected
router.get("/user/:tmdbId", protect, getMyReview);
router.post("/", protect, upsertReview);
router.delete("/:tmdbId", protect, deleteReview);

// Generic route LAST
router.get("/:tmdbId", getMovieReviews);

module.exports = router;