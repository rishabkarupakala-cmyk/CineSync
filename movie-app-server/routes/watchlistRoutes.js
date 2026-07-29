const express = require("express");

const {
  addMovie,
  getWatchlist,
  updateMovie,
  deleteMovie,
} = require("../controllers/watchlistController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", addMovie);

router.get("/", getWatchlist);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = router;