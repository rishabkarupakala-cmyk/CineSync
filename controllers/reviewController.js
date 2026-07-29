const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.upsertReview = async (req, res) => {
  try {
    const {
      tmdbId,
      title,
      poster,
      backdrop,
      releaseDate,
      overview,
      rating,
      review,
      spoiler,
    } = req.body;

    if (!tmdbId) {
      return res.status(400).json({
        message: "Movie ID is required.",
      });
    }

    if (rating === undefined || rating < 0 || rating > 10) {
      return res.status(400).json({
        message: "Rating must be between 0 and 10.",
      });
    }

    const savedReview = await prisma.review.upsert({
      where: {
        userId_tmdbId: {
          userId: req.user.id,
          tmdbId: Number(tmdbId),
        },
      },

      update: {
        title,
        poster,
        backdrop,
        releaseDate,
        overview,

        rating,
        review,
        spoiler,
      },

      create: {
        tmdbId: Number(tmdbId),

        title,
        poster,
        backdrop,
        releaseDate,
        overview,

        rating,
        review,
        spoiler: spoiler ?? false,

        userId: req.user.id,
      },
    });

    return res.status(200).json(savedReview);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

  

exports.getMovieReviews = async (req, res) => {
  try {
    const tmdbId = Number(req.params.tmdbId);

    const reviews = await prisma.review.findMany({
      where: {
        tmdbId,
      },

      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },

        replies: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },

          orderBy: {
            createdAt: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(reviews);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getMyReview = async (req, res) => {
  try {
    const tmdbId = Number(req.params.tmdbId);

    const review = await prisma.review.findUnique({
      where: {
        userId_tmdbId: {
          userId: req.user.id,
          tmdbId,
        },
      },
    });

    return res.json(review);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const tmdbId = Number(req.params.tmdbId);

    const review = await prisma.review.findUnique({
      where: {
        userId_tmdbId: {
          userId: req.user.id,
          tmdbId,
        },
      },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    await prisma.review.delete({
      where: {
        id: review.id,
      },
    });

    return res.json({
      message: "Review deleted successfully.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const tmdbId = Number(req.params.tmdbId);

    const result = await prisma.review.aggregate({
      where: {
        tmdbId,
      },

      _avg: {
        rating: true,
      },

      _count: {
        rating: true,
      },
    });

    return res.json({
      averageRating: result._avg.rating ?? 0,
      totalReviews: result._count.rating,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.addReply = async (req, res) => {
  try {
    const reviewId = Number(req.params.reviewId);
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Reply cannot be empty.",
      });
    }

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    const reply = await prisma.reply.create({
      data: {
        text: text.trim(),
        reviewId,
        userId: req.user.id,
      },

      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return res.status(201).json(reply);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getReplies = async (req, res) => {
  try {
    const reviewId = Number(req.params.reviewId);

    const replies = await prisma.reply.findMany({
      where: {
        reviewId,
      },

      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    return res.json(replies);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const replyId = Number(req.params.replyId);

    const reply = await prisma.reply.findUnique({
      where: {
        id: replyId,
      },
    });

    if (!reply) {
      return res.status(404).json({
        message: "Reply not found.",
      });
    }

    if (reply.userId !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized.",
      });
    }

    await prisma.reply.delete({
      where: {
        id: replyId,
      },
    });

    return res.json({
      message: "Reply deleted.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};