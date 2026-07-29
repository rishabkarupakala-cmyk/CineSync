const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await prisma.notification.findMany({
      where: {
        receiverId: userId,
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
        review: {
          select: {
            id: true,
            tmdbId: true,
            rating: true,
            review: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedNotifications = await Promise.all(
      notifications.map(async (notification) => {
        let followRequestId = null;

        if (notification.type === "FOLLOW_REQUEST") {
          const request = await prisma.followRequest.findFirst({
            where: {
              senderId: notification.senderId,
              receiverId: notification.receiverId,
              status: "PENDING",
            },
            select: {
              id: true,
            },
          });

          followRequestId = request?.id ?? null;
        }

        return {
          id: notification.id,
          type: notification.type,
          isRead: notification.isRead,
          createdAt: notification.createdAt,
          message: notification.message,

          sender: notification.sender,

          review: notification.review,

          followRequestId,
        };
      })
    );

    return res.json(formattedNotifications);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const unread = await prisma.notification.count({
      where: {
        receiverId: userId,
        isRead: false,
      },
    });

    return res.json({
      unread,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notificationId = Number(req.params.id);
    const userId = req.user.id;

    const notification = await prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    if (notification.receiverId !== userId) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    const updated = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await prisma.notification.updateMany({
      where: {
        receiverId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return res.json({
      message: "All notifications marked as read.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = Number(req.params.id);
    const userId = req.user.id;

    const notification = await prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    if (notification.receiverId !== userId) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    await prisma.notification.delete({
      where: {
        id: notificationId,
      },
    });

    return res.json({
      message: "Notification deleted.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.deleteReadNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const deleted = await prisma.notification.deleteMany({
      where: {
        receiverId: userId,
        isRead: true,
      },
    });

    return res.json({
      message: `${deleted.count} notification(s) deleted.`,
      deleted: deleted.count,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};

exports.clearNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const deleted = await prisma.notification.deleteMany({
      where: {
        receiverId: userId,
      },
    });

    return res.json({
      message: `${deleted.count} notification(s) cleared.`,
      deleted: deleted.count,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error.",
    });
  }
};