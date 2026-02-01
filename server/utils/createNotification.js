import Notification from "../models/Notification.js";

const createNotification = async (userId, message) => {
  await Notification.create({
    user: userId,
    message,
  });
};

export default createNotification;
