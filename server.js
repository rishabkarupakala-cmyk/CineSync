const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");
const reviewRoutes = require("./routes/reviewRoutes");
const express = require("express");
const profileRoutes = require("./routes/profileRoutes");
const cors = require("cors");
require("dotenv").config();
console.log("Node:", process.version);
console.log("Fetch:", typeof fetch);

dns.lookup("api.themoviedb.org", (err, address) => {
  console.log("DNS TEST:", err, address);
});
const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const trendingRoutes = require("./routes/trendingRoutes");
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/profile", profileRoutes);
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});