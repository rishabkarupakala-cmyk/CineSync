const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("➡️ Trending route called");

    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },
      }
    );

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("First 200 chars:", text.slice(0, 200));

    res.status(response.status).send(text);
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
    console.error("CAUSE:", err.cause);

    res.status(500).json({
      message: "Failed",
      error: err.message,
    });
  }
});

module.exports = router;