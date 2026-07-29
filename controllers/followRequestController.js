const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/*
 * GET /api/follow-requests/pending
 */
exports.getPendingRequests = async (req, res) => {
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

/*
 * POST /api/follow-requests/:id/accept
 */
exports.acceptFollowRequest = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const userId = req.user.id;

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

    if (request.receiverId !== userId) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    if (request.status !== "PENDING") {
      return res.status(400).json({
        message: "Request already processed.",
      });
    }

    await prisma.$transaction(async (tx) => {
      const existingFollow = await tx.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: request.senderId,
            followingId: request.receiverId,
          },
        },
      });

      if (!existingFollow) {
        await tx.follow.create({
          data: {
            followerId: request.senderId,
            followingId: request.receiverId,
          },
        });
      }

      await tx.followRequest.delete({
        where: {
          id: request.id,
        },
      });

      await tx.notification.deleteMany({
        where: {
          senderId: request.senderId,
          receiverId: request.receiverId,
          type: "FOLLOW_REQUEST",
        },
      });

      await tx.notification.create({
        data: {
          senderId: request.receiverId,
          receiverId: request.senderId,
          type: "FOLLOW",
          message: "accepted your follow request",
        },
      });
    });

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

/*
 * POST /api/follow-requests/:id/reject
 */
exports.rejectFollowRequest = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const userId = req.user.id;

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

    if (request.receiverId !== userId) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.followRequest.delete({
        where: {
          id: request.id,
        },
      });

      await tx.notification.deleteMany({
        where: {
          senderId: request.senderId,
          receiverId: request.receiverId,
          type: "FOLLOW_REQUEST",
        },
      });
    });

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