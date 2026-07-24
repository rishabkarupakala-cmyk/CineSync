const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

async function test() {
  try {
    console.log("Testing TMDB...");

    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();