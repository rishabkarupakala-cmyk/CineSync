const express = require("express");

const {
  followUser,
  unfollowUser,
  searchUsers,
  getProfile,
  getFollowers,
  getFollowing,
  getMutuals,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
  cancelFollowRequest,
} = require("../controllers/friendController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/search", protect, searchUsers);

router.get("/profile/:id", protect, getProfile);

router.post("/follow/:id", protect, followUser);

router.delete("/unfollow/:id", protect, unfollowUser);

router.get("/followers/:id", protect, getFollowers);

router.get("/following/:id", protect, getFollowing);

router.get("/mutuals/:id", protect, getMutuals);

router.get("/follow-requests", protect, getFollowRequests);

router.post(
  "/follow-requests/:id/accept",
  protect,
  acceptFollowRequest
);

router.post(
  "/follow-requests/:id/reject",
  protect,
  rejectFollowRequest
);

router.delete(
  "/follow-requests/:id",
  protect,
  cancelFollowRequest
);

module.exports = router;