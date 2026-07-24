const { PrismaClient } = require("@prisma/client");
const WATCHLIST_STATUS = require("../constants/watchlistStatus");

const prisma = new PrismaClient();

const VALID_STATUSES = Object.values(WATCHLIST_STATUS);

/*
=========================================
Add Movie
=========================================
*/
exports.addMovie = async (req, res) => {
  try {
    const {
      tmdbId,
      title,
      poster,
      backdrop,
      releaseDate,
      overview,
      status,
    } = req.body;

    if (!tmdbId || !title) {
      return res.status(400).json({
        message: "Movie ID and title are required.",
      });
    }

    const existing = await prisma.watchlist.findUnique({
      where: {
        userId_tmdbId: {
          userId: req.user.id,
          tmdbId,
        },
      },
    });

    if (existing) {
      return res.status(409).json({
        message: "Movie already exists in your watchlist.",
      });
    }

    const movie = await prisma.watchlist.create({
      data: {
        tmdbId,
        title,
        poster,
        backdrop,
        releaseDate,
        overview,
        status: status || WATCHLIST_STATUS.PLANNED,
        userId: req.user.id,
      },
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/*
=========================================
Get Watchlist
=========================================
*/
exports.getWatchlist = async (req, res) => {
  try {
    const movies = await prisma.watchlist.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/*
=========================================
Update Movie Status
=========================================
*/
exports.updateMovie = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const movie = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    if (
      req.body.status &&
      !VALID_STATUSES.includes(req.body.status)
    ) {
      return res.status(400).json({
        message: "Invalid watchlist status.",
      });
    }

    const updated = await prisma.watchlist.update({
      where: {
        id,
      },
      data: {
        status: req.body.status,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/*
=========================================
Delete Movie
=========================================
*/
exports.deleteMovie = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const movie = await prisma.watchlist.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    await prisma.watchlist.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Movie removed successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};