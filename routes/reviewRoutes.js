const express = require("express");

const {
  upsertReview,
  getMovieReviews,
  getMyReview,
  deleteReview,
  getAverageRating,
  addReply,
  getReplies,
  deleteReply,
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
router.post("/:reviewId/replies", protect, addReply);
router.get("/:reviewId/replies", getReplies);
router.delete("/replies/:replyId", protect, deleteReply);

// Generic route LAST
router.get("/:tmdbId", getMovieReviews);

module.exports = router;