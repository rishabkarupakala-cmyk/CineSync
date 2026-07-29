const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getMyProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        createdAt: true,

        reviews: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },

        watchlist: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },

        _count: {
          select: {
            reviews: true,
            watchlist: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.params.username,
      },

      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        createdAt: true,

        reviews: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },

        watchlist: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },

        _count: {
          select: {
            reviews: true,
            watchlist: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { avatar, bio } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },

      data: {
        avatar,
        bio,
      },

      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};