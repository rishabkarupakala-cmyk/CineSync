const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getFollowers = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const followers = await prisma.follow.findMany({
      where: {
        followingId: user.id,
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(followers.map((f) => f.follower));
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const following = await prisma.follow.findMany({
      where: {
        followerId: user.id,
      },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(following.map((f) => f.following));
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error.",
    });
  }
};