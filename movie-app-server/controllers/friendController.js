const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = Number(req.params.id);

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: followingId,
      },
      select: {
        id: true,
        isPrivate: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      return res.status(400).json({
        message: "Already following this user.",
      });
    }

    if (user.isPrivate) {
      const existingRequest = await prisma.followRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId: followerId,
            receiverId: followingId,
          },
        },
      });

      if (existingRequest) {
        return res.status(400).json({
          message: "Follow request already sent.",
        });
      }

      await prisma.$transaction([
        prisma.followRequest.create({
          data: {
            senderId: followerId,
            receiverId: followingId,
          },
        }),
        prisma.notification.create({
          data: {
            type: "FOLLOW_REQUEST",
            senderId: followerId,
            receiverId: followingId,
          },
        }),
      ]);

      return res.status(201).json({
        requested: true,
        message: "Follow request sent.",
      });
    }

    const [follow] = await prisma.$transaction([
      prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      }),
      prisma.notification.create({
        data: {
          type: "FOLLOW",
          senderId: followerId,
          receiverId: followingId,
        },
      }),
    ]);

    return res.status(201).json({
      requested: false,
      follow,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};
exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = Number(req.params.id);

    await prisma.$transaction([
      prisma.follow.deleteMany({
        where: {
          followerId,
          followingId,
        },
      }),

      prisma.followRequest.deleteMany({
        where: {
          senderId: followerId,
          receiverId: followingId,
        },
      }),

      prisma.notification.deleteMany({
        where: {
          senderId: followerId,
          receiverId: followingId,
          type: {
            in: ["FOLLOW", "FOLLOW_REQUEST"],
          },
        },
      }),
    ]);

    return res.json({
      message: "Unfollowed successfully.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const q = req.query.q || "";

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: q,
          mode: "insensitive",
        },
        NOT: {
          id: currentUserId,
        },
      },
      include: {
        followers: true,
        following: true,
        receivedFollowRequests: true,
        _count: {
          select: {
            followers: true,
            following: true,
            reviews: true,
            watchlist: true,
          },
        },
      },
      take: 20,
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      isPrivate: user.isPrivate,
      isFollowing: user.followers.some(
        (follow) => follow.followerId === currentUserId
      ),
      requestSent: user.receivedFollowRequests.some(
        (request) =>
          request.senderId === currentUserId &&
          request.status === "PENDING"
      ),
      followersCount: user._count.followers,
      followingCount: user._count.following,
      reviewCount: user._count.reviews,
      watchlistCount: user._count.watchlist,
    }));

    return res.json(formattedUsers);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const profileUserId = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id: profileUserId,
      },
      include: {
        followers: true,
        following: true,
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        watchlist: {
          orderBy: {
            createdAt: "desc",
          },
          take: 12,
        },
        favoriteMovies: true,
        receivedFollowRequests: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isOwnProfile = currentUserId === user.id;

    const isFollowing = user.followers.some(
      (follow) => follow.followerId === currentUserId
    );

    const isFollower = user.following.some(
      (follow) => follow.followingId === currentUserId
    );

    const isMutual = isFollowing && isFollower;

    const requestSent = user.receivedFollowRequests.some(
      (request) =>
        request.senderId === currentUserId &&
        request.status === "PENDING"
    );

    const canViewProfile =
  isOwnProfile ||
  !user.isPrivate ||
  isFollowing;

    const canViewReviews =
  canViewProfile &&
  (
    user.reviewsVisibility === "PUBLIC" ||
    isOwnProfile ||
    (user.reviewsVisibility === "FOLLOWERS" && isFollowing)
  );

    const canViewWatchlist =
  canViewProfile &&
  (
    user.watchlistVisibility === "PUBLIC" ||
    isOwnProfile ||
    (user.watchlistVisibility === "FOLLOWERS" && isFollowing)
  );

    const canViewFavorites =
  canViewProfile &&
  (
    user.favoritesVisibility === "PUBLIC" ||
    isOwnProfile ||
    (user.favoritesVisibility === "FOLLOWERS" && isFollowing)
  );

   const canViewActivity =
  canViewProfile &&
  (
    user.activityVisibility === "PUBLIC" ||
    isOwnProfile ||
    (user.activityVisibility === "FOLLOWERS" && isFollowing)
  );

    

let canMessage = false;

    switch (user.allowMessages) {
      case "EVERYONE":
        canMessage = true;
        break;

      case "FOLLOWERS":
        canMessage = isFollowing;
        break;

      case "FOLLOWING":
        canMessage = isFollower;
        break;

      case "MUTUALS":
        canMessage = isMutual;
        break;

      case "NOBODY":
        canMessage = false;
        break;
    }

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        banner: user.banner,
        bio: user.bio,
        isPrivate: user.isPrivate,

        followerCount: user.followers.length,
        followingCount: user.following.length,
        reviewCount: user.reviews.length,
        watchlistCount: user.watchlist.length,
        favoriteCount: user.favoriteMovies.length,
      },

      relationship: {
        isFollowing,
        isFollower,
        isMutual,
        requestSent,
      },

      permissions: {
  canViewProfile,
  canViewReviews,
  canViewWatchlist,
  canViewFavorites,
  canViewActivity,
  canMessage,
},

      reviews: canViewReviews ? user.reviews : [],

      watchlist: canViewWatchlist ? user.watchlist : [],

      favoriteMovies: canViewFavorites
        ? user.favoriteMovies
        : [],
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
            isPrivate: true,
          },
        },
      },
    });

    return res.json(followers.map((f) => f.follower));
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const following = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
            isPrivate: true,
          },
        },
      },
    });

    return res.json(following.map((f) => f.following));
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.getMutuals = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = Number(req.params.id);

    const myFollowing = await prisma.follow.findMany({
      where: {
        followerId: currentUserId,
      },
      select: {
        followingId: true,
      },
    });

    const otherFollowing = await prisma.follow.findMany({
      where: {
        followerId: otherUserId,
      },
      select: {
        followingId: true,
      },
    });

    const mutualIds = myFollowing
      .map((f) => f.followingId)
      .filter((id) =>
        otherFollowing.some((o) => o.followingId === id)
      );

    const mutualUsers = await prisma.user.findMany({
      where: {
        id: {
          in: mutualIds,
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
      },
    });

    return res.json(mutualUsers);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};
exports.getFollowRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await prisma.followRequest.findMany({
      where: {
        receiverId: userId,
        status: "PENDING",
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
            isPrivate: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(requests);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.acceptFollowRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const requestId = Number(req.params.id);

    const request = await prisma.followRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      return res.status(404).json({
        message: "Follow request not found.",
      });
    }

    if (request.receiverId !== receiverId) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    await prisma.$transaction([
      prisma.follow.create({
        data: {
          followerId: request.senderId,
          followingId: receiverId,
        },
      }),

      prisma.followRequest.delete({
        where: {
          id: requestId,
        },
      }),

      prisma.notification.deleteMany({
        where: {
          senderId: request.senderId,
          receiverId,
          type: "FOLLOW_REQUEST",
        },
      }),

      prisma.notification.create({
        data: {
          type: "FOLLOW",
          senderId: receiverId,
          receiverId: request.senderId,
        },
      }),
    ]);

    return res.json({
      message: "Follow request accepted.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.rejectFollowRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const requestId = Number(req.params.id);

    const request = await prisma.followRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      return res.status(404).json({
        message: "Follow request not found.",
      });
    }

    if (request.receiverId !== receiverId) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    await prisma.$transaction([
      prisma.followRequest.delete({
        where: {
          id: requestId,
        },
      }),

      prisma.notification.deleteMany({
        where: {
          senderId: request.senderId,
          receiverId,
          type: "FOLLOW_REQUEST",
        },
      }),
    ]);

    return res.json({
      message: "Follow request rejected.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.cancelFollowRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = Number(req.params.id);

    await prisma.$transaction([
      prisma.followRequest.deleteMany({
        where: {
          senderId,
          receiverId,
          status: "PENDING",
        },
      }),

      prisma.notification.deleteMany({
        where: {
          senderId,
          receiverId,
          type: "FOLLOW_REQUEST",
        },
      }),
    ]);

    return res.json({
      message: "Follow request cancelled.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};