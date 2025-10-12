const Notification = require("./../models/notificationModel");

exports.createNotification = async ({ userId, type, message, foodItemId = null }) => {
  try {
    const notif = await Notification.create({
      user: userId,
      type,
      message,
      foodItem: foodItemId,
    });
    return notif;
  } catch (err) {
    console.error("Notification creation failed:", err);
  }
};
